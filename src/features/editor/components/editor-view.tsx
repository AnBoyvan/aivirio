import Image from 'next/image';
import { useRef } from 'react';

import type { Id } from '@/convex/_generated/dataModel';
import { useFile } from '@/features/files/hooks/use-file';
import { useUpdateFile } from '@/features/files/hooks/use-update-file';

import { useEditor } from '../hooks/use-editor';
import { CodeEditor } from './code-editor';
import { FileBreadcrumbs } from './file-breadcrumbs';
import { TopNavigation } from './top-navigation';

const DEBOUNCE_MS = 1500;

interface EditorViewProps {
	projectId: Id<'projects'>;
}

export const EditorView = ({ projectId }: EditorViewProps) => {
	const { activeTabId } = useEditor(projectId);
	const activeFile = useFile(activeTabId);
	const updateFile = useUpdateFile();
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const isActiveFileBinary = activeFile && activeFile.storageId;
	const isActiveFileText = activeFile && !activeFile.storageId;

	return (
		<div className="flex h-full flex-col">
			<div className="flex items-center">
				<TopNavigation projectId={projectId} />
			</div>
			{activeTabId && <FileBreadcrumbs projectId={projectId} />}
			<div className="min-h-0 flex-1 bg-background">
				{!activeFile && (
					<div className="flex size-full items-center justify-center">
						<Image
							src="/logo.svg"
							alt="Aivirio"
							width={200}
							height={200}
							className="opacity-25"
						/>
					</div>
				)}
				{isActiveFileText && (
					<CodeEditor
						key={activeFile._id}
						fileName={activeFile.name}
						initialValue={activeFile.content}
						onChange={(content: string) => {
							if (timeoutRef.current) {
								clearTimeout(timeoutRef.current);
							}

							timeoutRef.current = setTimeout(() => {
								updateFile({ id: activeFile._id, content });
							}, DEBOUNCE_MS);
						}}
					/>
				)}
				{isActiveFileBinary && <p>TODO: Implement binary preview</p>}
			</div>
		</div>
	);
};
