import { WidgetType } from '@codemirror/view';

export class SuggestionWidget extends WidgetType {
	constructor(readonly text: string) {
		super();
	}

	toDOM() {
		const span = document.createElement('span');
		span.textContent = this.text;
		span.style.opacity = '0.4';
		span.style.pointerEvents = 'none';
		return span;
	}
}
