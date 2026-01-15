import { useEffect, useMemo, useRef } from 'react';

import { indentWithTab } from '@codemirror/commands';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView, keymap } from '@codemirror/view';
import { indentationMarkers } from '@replit/codemirror-indentation-markers';

import { customSetup } from '../extension/custom-setup';
import { getLangExtension } from '../extension/lang-extention';
import { minimap } from '../extension/minimap';
import { customTheme } from '../extension/theme';

interface CodeEditorProps {
	fileName: string;
	initialValue?: string;
	onChange: (value: string) => void;
}

export const CodeEditor = ({
	fileName,
	initialValue = '',
	onChange,
}: CodeEditorProps) => {
	const editorRef = useRef<HTMLDivElement>(null);
	const viewRef = useRef<EditorView | null>(null);

	const langExtension = useMemo(() => getLangExtension(fileName), [fileName]);

	useEffect(() => {
		if (!editorRef.current) return;

		const view = new EditorView({
			doc: initialValue,
			parent: editorRef.current,
			extensions: [
				oneDark,
				customTheme,
				customSetup,
				langExtension,
				keymap.of([indentWithTab]),
				minimap(),
				indentationMarkers(),
				EditorView.updateListener.of(update => {
					if (update.docChanged) {
						onChange(update.state.doc.toString());
					}
				}),
			],
		});

		viewRef.current = view;

		return () => {
			view.destroy();
		};
	}, [langExtension]);

	return <div ref={editorRef} className="size-full bg-background pl-4" />;
};
