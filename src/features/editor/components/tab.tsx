import { FileIcon } from '@react-symbols/icons/utils';
import { XIcon } from 'lucide-react';

import { Spinner } from '@/components/ui/spinner';
import type { Id } from '@/convex/_generated/dataModel';
import { useFile } from '@/features/files/hooks/use-file';
import { cn } from '@/lib/utils/cn';

import { useEditor } from '../hooks/use-editor';

interface TabProps {
	fileId: Id<'files'>;
	isFirst: boolean;
	projectId: Id<'projects'>;
}

export const Tab = ({ fileId, isFirst, projectId }: TabProps) => {
	const file = useFile(fileId);
	const { activeTabId, previewTabId, setActiveTab, openFile, closeTab } =
		useEditor(projectId);

	const isActive = activeTabId === fileId;
	const isPreview = previewTabId === fileId;
	const fileName = file?.name ?? 'Loading...';

	return (
		<div
			onClick={() => setActiveTab(fileId)}
			onDoubleClick={() => openFile(fileId, { pinned: true })}
			className={cn(
				'group flex h-8.75 cursor-pointer items-center gap-2 border-transparent border-x border-y pr-1.5 pl-2 text-muted-foreground hover:bg-accent/30',
				isActive &&
					'-mb-px border-x-border border-b-background bg-background text-foreground drop-shadow',
				isFirst && 'border-l-transparent',
			)}
		>
			{file === undefined ? (
				<Spinner className="text-ring" />
			) : (
				<FileIcon fileName={fileName} autoAssign className="size-4" />
			)}
			<span className={cn('whitespace-nowrap text-sm', isPreview && 'italic')}>
				{fileName}
			</span>
			<button
				onClick={e => {
					e.preventDefault();
					e.stopPropagation();
					closeTab(fileId);
				}}
				onKeyDown={e => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						e.stopPropagation();
						closeTab(fileId);
					}
				}}
				className={cn(
					'rounded-sm p-0.5 opacity-0 hover:bg-white/10 group-hover:opacity-100',
					isActive && 'opacity-100',
				)}
			>
				<XIcon className="size-3.5" />
			</button>
		</div>
	);
};
