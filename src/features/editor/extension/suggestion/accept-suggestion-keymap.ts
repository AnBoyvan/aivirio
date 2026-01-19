import { keymap } from '@codemirror/view';

import { setSuggestionEffect, suggestionState } from './state';

export const acceptSuggestionKeymap = keymap.of([
	{
		key: 'Tab',
		run: view => {
			const suggestion = view.state.field(suggestionState);
			if (!suggestion) {
				return false;
			}
			const cursor = view.state.selection.main.head;
			view.dispatch({
				changes: { from: cursor, insert: suggestion },
				selection: { anchor: cursor + suggestion.length },
				effects: setSuggestionEffect.of(null),
			});
			return true;
		},
	},
]);
