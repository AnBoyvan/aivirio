import { useState } from 'react';

import { FileIcon, FolderIcon } from '@react-symbols/icons/utils';
import { ChevronRightIcon } from 'lucide-react';

import type { Doc, Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils/cn';

import { useCreateFile } from '../../hooks/use-create-file';
import { useCreateFolder } from '../../hooks/use-create-folder';
import { useFolderContents } from '../../hooks/use-folder-contents';
import { useRemoveFile } from '../../hooks/use-remove-file';
import { useRenameFile } from '../../hooks/use-rename-file';
import { getItemPadding } from '../../utils/get-item-padding';
import { CreateInput } from './create-input';
import { LoadingRow } from './loading-row';
import { RenameInput } from './rename-input';
import { TreeItemWrapper } from './tree-item-wrapper';

interface TreeProps {
	item: Doc<'files'>;
	level?: number;
	projectId: Id<'projects'>;
}

export const Tree = ({ item, level = 0, projectId }: TreeProps) => {
	const createFile = useCreateFile();
	const createFolder = useCreateFolder();
	const renameFile = useRenameFile();
	const removeFile = useRemoveFile();

	const [isOpen, setIsOpen] = useState(false);
	const [isRenaming, setIsRenaming] = useState(false);
	const [creating, setCreating] = useState<'file' | 'folder' | null>(null);

	const folderContents = useFolderContents({
		projectId,
		parentId: item._id,
		enabled: item.type === 'folder' && isOpen,
	});

	const startCreating = (type: 'file' | 'folder') => {
		setIsOpen(true);
		setCreating(type);
	};

	const handleCreate = (name: string) => {
		setCreating(null);

		if (creating === 'file') {
			createFile({
				projectId,
				name,
				content: '',
				parentId: item._id,
			});
		} else {
			createFolder({
				projectId,
				name,
				parentId: item._id,
			});
		}
	};

	const handleRename = (newName: string) => {
		setIsRenaming(false);

		if (newName === item.name) {
			return;
		}

		renameFile({ id: item._id, newName });
	};

	if (item.type === 'file') {
		const fileName = item.name;

		if (isRenaming) {
			return (
				<RenameInput
					level={level}
					type="file"
					defaultValue={item.name}
					onSubmit={handleRename}
					onCancel={() => setIsRenaming(false)}
				/>
			);
		}

		return (
			<TreeItemWrapper
				item={item}
				level={level}
				isActive={false}
				onClick={() => {}}
				onDoubleClick={() => {}}
				onRename={() => setIsRenaming(true)}
				onDelete={() => {
					// TODO: Close tab
					removeFile({ id: item._id });
				}}
			>
				<FileIcon fileName={fileName} autoAssign className="size-4" />
				<span className="truncate text-sm">{fileName}</span>
			</TreeItemWrapper>
		);
	}

	const folderName = item.name;

	const folderRender = (
		<>
			<div className="flex items-center gap-0.5">
				<ChevronRightIcon
					className={cn(
						'size-4 shrink-0 text-muted-foreground',
						isOpen && 'rotate-90',
					)}
				/>
				<FolderIcon folderName={folderName} className="size-4" />
			</div>
			<span className="truncate text-sm">{folderName}</span>
		</>
	);

	if (creating) {
		return (
			<>
				<button
					onClick={() => setIsOpen(value => !value)}
					className="group flex h-5.5 w-full items-center gap-1 hover:bg-accent/30"
					style={{ paddingLeft: getItemPadding(level, false) }}
				>
					{folderRender}
				</button>
				{isOpen && (
					<>
						{folderContents === undefined && <LoadingRow level={level + 1} />}
						<CreateInput
							type={creating}
							level={level + 1}
							onSubmit={handleCreate}
							onCancel={() => setCreating(null)}
						/>
						{folderContents?.map(subItem => (
							<Tree
								key={subItem._id}
								item={subItem}
								level={level + 1}
								projectId={projectId}
							/>
						))}
					</>
				)}
			</>
		);
	}

	if (isRenaming) {
		return (
			<>
				<RenameInput
					level={level}
					type="folder"
					isOpen={isOpen}
					defaultValue={folderName}
					onSubmit={handleRename}
					onCancel={() => setIsRenaming(false)}
				/>
				{isOpen && (
					<>
						{folderContents === undefined && <LoadingRow level={level + 1} />}
						{folderContents?.map(subItem => (
							<Tree
								key={subItem._id}
								item={subItem}
								level={level + 1}
								projectId={projectId}
							/>
						))}
					</>
				)}
			</>
		);
	}

	return (
		<>
			<TreeItemWrapper
				item={item}
				level={level}
				isActive={false}
				onClick={() => setIsOpen(value => !value)}
				onRename={() => setIsRenaming(true)}
				onDelete={() => {
					// TODO: Close tab
					removeFile({ id: item._id });
				}}
				onCreateFile={() => startCreating('file')}
				onCreateFolder={() => startCreating('folder')}
			>
				{folderRender}
			</TreeItemWrapper>
			{isOpen && (
				<>
					{folderContents === undefined && <LoadingRow level={level + 1} />}
					{folderContents?.map(subItem => (
						<Tree
							key={subItem._id}
							item={subItem}
							level={level + 1}
							projectId={projectId}
						/>
					))}
				</>
			)}
		</>
	);
};
