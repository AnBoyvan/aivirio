import {
	Decoration,
	type DecorationSet,
	type EditorView,
	ViewPlugin,
	type ViewUpdate,
} from '@codemirror/view';

import { acceptSuggestionKeymap } from './accept-suggestion-keymap';
import { fetcher } from './fetcher';
import { generatePayload } from './generate-payload';
import { setSuggestionEffect, suggestionState } from './state';
import { SuggestionWidget } from './widget';

let debounceTimer: number | null = null;
let isWaitingForSuggestion = false;
let currentAbortController: AbortController | null = null;
const DEBOUNCE_DELAY = 300;

const createDebouncePlugin = (fileName: string) =>
	ViewPlugin.fromClass(
		class {
			constructor(view: EditorView) {
				this.triggerSuggestion(view);
			}

			update(update: ViewUpdate) {
				if (update.docChanged || update.selectionSet) {
					this.triggerSuggestion(update.view);
				}
			}

			triggerSuggestion(view: EditorView) {
				if (debounceTimer !== null) {
					clearTimeout(debounceTimer);
				}

				if (currentAbortController !== null) {
					currentAbortController.abort();
				}

				isWaitingForSuggestion = true;

				debounceTimer = window.setTimeout(async () => {
					const payload = generatePayload(view, fileName);

					if (!payload) {
						isWaitingForSuggestion = false;
						view.dispatch({
							effects: setSuggestionEffect.of(null),
						});
						return;
					}

					currentAbortController = new AbortController();
					const suggestion = await fetcher(
						payload,
						currentAbortController.signal,
					);
					isWaitingForSuggestion = false;
					view.dispatch({
						effects: setSuggestionEffect.of(suggestion),
					});
				}, DEBOUNCE_DELAY);
			}

			destroy() {
				if (debounceTimer !== null) {
					clearTimeout(debounceTimer);
				}
				if (currentAbortController !== null) {
					currentAbortController.abort();
				}
			}
		},
	);

const renderPlugin = ViewPlugin.fromClass(
	class {
		decorations: DecorationSet;

		constructor(view: EditorView) {
			this.decorations = this.build(view);
		}

		update(update: ViewUpdate) {
			const docChanged = update.docChanged;
			const cursorMoved = update.selectionSet;
			const suggestionChanged = update.transactions.some(transaction =>
				transaction.effects.some(effect => effect.is(setSuggestionEffect)),
			);
			const shouldRebuild = docChanged || cursorMoved || suggestionChanged;

			if (shouldRebuild) {
				this.decorations = this.build(update.view);
			}
		}

		build(view: EditorView) {
			if (isWaitingForSuggestion) {
				return Decoration.none;
			}

			const suggestion = view.state.field(suggestionState);
			if (!suggestion) {
				return Decoration.none;
			}

			const cursor = view.state.selection.main.head;
			return Decoration.set([
				Decoration.widget({
					widget: new SuggestionWidget(suggestion),
					side: 1,
				}).range(cursor),
			]);
		}
	},
	{ decorations: plugin => plugin.decorations },
);

export const suggestion = (fileName: string) => [
	suggestionState,
	createDebouncePlugin(fileName),
	renderPlugin,
	acceptSuggestionKeymap,
];
