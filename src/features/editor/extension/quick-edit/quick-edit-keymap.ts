import { keymap } from '@codemirror/view';

import { showQuickEditEffect } from './state';

export const quickEditKeymap = keymap.of([
	{
		key: 'Mod-k',
		run: view => {
			const selection = view.state.selection.main;
			if (selection.empty) {
				return false;
			}

			view.dispatch({
				effects: showQuickEditEffect.of(true),
			});
			return true;
		},
	},
]);
