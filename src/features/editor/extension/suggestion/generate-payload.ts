import type { EditorView } from 'codemirror';

export const generatePayload = (view: EditorView, fileName: string) => {
	const code = view.state.doc.toString();

	if (!code || code.trim().length === 0) {
		return null;
	}

	const cursorPosition = view.state.selection.main.head;
	const currentLine = view.state.doc.lineAt(cursorPosition);
	const cursorInLine = cursorPosition - currentLine.from;

	const previousLines: string[] = [];
	const previousLinesToFetch = Math.min(5, currentLine.number - 1);

	for (let i = previousLinesToFetch; i >= 1; i--) {
		previousLines.push(view.state.doc.line(currentLine.number - i).text);
	}

	const nextLines: string[] = [];
	const totalLines = view.state.doc.lines;
	const linesToFetch = Math.min(5, totalLines - currentLine.number);

	for (let i = 1; i <= linesToFetch; i++) {
		nextLines.push(view.state.doc.line(currentLine.number + i).text);
	}

	return {
		fileName,
		code,
		currentLine: currentLine.text,
		previousLines: previousLines.join('\n'),
		textBeforeCursor: currentLine.text.slice(0, cursorInLine),
		textAfterCursor: currentLine.text.slice(cursorInLine),
		nextLines: nextLines.join('\n'),
		lineNumber: currentLine.number,
	};
};
