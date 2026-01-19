import { type EditorState, StateField } from '@codemirror/state';
import { showTooltip, type Tooltip } from '@codemirror/view';
import { EditorView } from 'codemirror';

import { quickEditState, showQuickEditEffect } from './quick-edit/state';

let editorView: EditorView | null = null;

const createToopltipForSelection = (state: EditorState): readonly Tooltip[] => {
	const selection = state.selection.main;
	if (selection.empty) {
		return [];
	}

	const isQuickEditIsActive = state.field(quickEditState);
	if (isQuickEditIsActive) {
		return [];
	}

	return [
		{
			pos: selection.to,
			above: false,
			strictSide: false,
			create() {
				const dom = document.createElement('div');
				dom.className =
					'bg-popover text-popover-foreground z-50 rounded-sm border border-input p-2 shadow-md flex items-center gap-4 text-sm';

				const addToChatButton = document.createElement('button');
				addToChatButton.type = 'button';
				addToChatButton.textContent = 'Add to Chat';
				addToChatButton.className =
					'font-sans p-1 px-2 hover:bg-foreground/10 rounded-sm';
				addToChatButton.onclick = () => {
					// TODO: Add functionality
				};

				const quicEditButton = document.createElement('button');
				addToChatButton.type = 'button';
				quicEditButton.className =
					'font-sans p-1 px-2 hover:bg-foreground/10 rounded-sm flex items-center gap-1';

				const quickEditButtonText = document.createElement('span');
				quickEditButtonText.textContent = 'Quick Edit';

				const quickEditButtonShortcut = document.createElement('span');
				quickEditButtonShortcut.textContent = 'ctrl+K';
				quickEditButtonShortcut.className = 'text-sm opacity-60';

				quicEditButton.appendChild(quickEditButtonText);
				quicEditButton.appendChild(quickEditButtonShortcut);

				quicEditButton.onclick = () => {
					if (editorView) {
						editorView.dispatch({
							effects: showQuickEditEffect.of(true),
						});
					}
				};

				dom.appendChild(addToChatButton);
				dom.appendChild(quicEditButton);

				return { dom };
			},
		},
	];
};

const selectionTooltipField = StateField.define<readonly Tooltip[]>({
	create(state) {
		return createToopltipForSelection(state);
	},

	update(tooltips, transaction) {
		if (transaction.docChanged || transaction.selection) {
			return createToopltipForSelection(transaction.state);
		}

		for (const effect of transaction.effects) {
			if (effect.is(showQuickEditEffect)) {
				return createToopltipForSelection(transaction.state);
			}
		}

		return tooltips;
	},

	provide: field => showTooltip.computeN([field], state => state.field(field)),
});

const captureViewExtension = EditorView.updateListener.of(update => {
	editorView = update.view;
});

export const selectionTooltip = () => [
	selectionTooltipField,
	captureViewExtension,
];
