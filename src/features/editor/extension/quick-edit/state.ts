import { StateEffect, StateField } from '@codemirror/state';

export const showQuickEditEffect = StateEffect.define<boolean>();

export const quickEditState = StateField.define<boolean>({
	create() {
		return false;
	},

	update(value, transaction) {
		for (const effect of transaction.effects) {
			if (effect.is(showQuickEditEffect)) {
				return effect.value;
			}
		}

		if (transaction.selection) {
			const selection = transaction.state.selection.main;
			if (selection.empty) {
				return false;
			}
		}

		return value;
	},
});
