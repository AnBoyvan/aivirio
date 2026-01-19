import { StateEffect, StateField } from '@codemirror/state';

export const setSuggestionEffect = StateEffect.define<string | null>();

export const suggestionState = StateField.define<string | null>({
	create() {
		return null;
	},
	update(value, transaction) {
		for (const effect of transaction.effects) {
			if (effect.is(setSuggestionEffect)) {
				return effect.value;
			}
		}

		return value;
	},
});
