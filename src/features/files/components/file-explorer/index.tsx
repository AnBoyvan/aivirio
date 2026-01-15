import { useState } from 'react';

import {
	ChevronRightIcon,
	CopyMinusIcon,
	FilePlusCornerIcon,
	FolderPlusIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Id } from '@/convex/_generated/dataModel';
import { useCreateFile } from '@/features/files/hooks/use-create-file';
import { useCreateFolder } from '@/features/files/hooks/use-create-folder';
import { useProject } from '@/features/projects/hooks/use-project';
import { cn } from '@/lib/utils/cn';

import { useFolderContents } from '../../hooks/use-folder-contents';
import { CreateInput } from './create-input';
import { LoadingRow } from './loading-row';
import { Tree } from './tree';

interface FileExplorerProps {
	projectId: Id<'projects'>;
}

export const FileExplorer = ({ projectId }: FileExplorerProps) => {
	const [isOpen, setIsOpen] = useState(true);
	const [collapseKey, setCollapseKey] = useState(0);
	const [creating, setCreating] = useState<'file' | 'folder' | null>(null);

	const project = useProject(projectId);
	const rootFiles = useFolderContents({ projectId, enabled: isOpen });

	const createFile = useCreateFile();
	const createFolder = useCreateFolder();
	const handleCreate = (name: string) => {
		setCreating(null);

		if (creating === 'file') {
			createFile({
				projectId,
				name,
				content: '',
				parentId: undefined,
			});
		} else {
			createFolder({
				projectId,
				name,
				parentId: undefined,
			});
		}
	};

	return (
		<div className="h-full bg-sidebar">
			<ScrollArea>
				<div
					role="button"
					onClick={() => setIsOpen(value => !value)}
					className="group/project flex h-5.5 w-full cursor-pointer items-center gap-0.5 bg-accent text-left font-bold"
				>
					<ChevronRightIcon
						className={cn(
							'size-4 shrink-0 text-muted-foreground',
							isOpen && 'rotate-90',
						)}
					/>
					<p className="line-clamp-1 text-xs uppercase">
						{project?.name ?? 'Loading...'}
					</p>
					<div className="ml-auto flex items-center gap-0.5 opacity-0 transition-none duration-0 group-hover/project:opacity-100">
						<Button
							onClick={e => {
								e.stopPropagation();
								e.preventDefault();
								setIsOpen(true);
								setCreating('file');
							}}
							variant="highlight"
							size="icon-xs"
						>
							<FilePlusCornerIcon className="size-3.5" />
						</Button>
						<Button
							onClick={e => {
								e.stopPropagation();
								e.preventDefault();
								setIsOpen(true);
								setCreating('folder');
							}}
							variant="highlight"
							size="icon-xs"
						>
							<FolderPlusIcon className="size-3.5" />
						</Button>
						<Button
							onClick={e => {
								e.stopPropagation();
								e.preventDefault();
								setCollapseKey(prev => prev + 1);
							}}
							variant="highlight"
							size="icon-xs"
						>
							<CopyMinusIcon className="size-3.5" />
						</Button>
					</div>
				</div>
				{isOpen && (
					<>
						{rootFiles === undefined && <LoadingRow level={0} />}
						{creating && (
							<CreateInput
								type={creating}
								level={0}
								onSubmit={handleCreate}
								onCancel={() => setCreating(null)}
							/>
						)}
						{rootFiles?.map(item => (
							<Tree
								key={`${item._id}-${collapseKey}`}
								item={item}
								level={0}
								projectId={projectId}
							/>
						))}
					</>
				)}
			</ScrollArea>
		</div>
	);
};
