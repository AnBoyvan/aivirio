import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuTrigger,
} from '@/components/ui/context-menu';
import type { Doc } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils/cn';

import { getItemPadding } from '../../utils/get-item-padding';

interface TreeItemWrapperProps {
	item: Doc<'files'>;
	children: React.ReactNode;
	level: number;
	isActive?: boolean;
	onClick?: () => void;
	onDoubleClick?: () => void;
	onRename?: () => void;
	onDelete?: () => void;
	onCreateFile?: () => void;
	onCreateFolder?: () => void;
}

export const TreeItemWrapper = ({
	item,
	children,
	level,
	isActive,
	onClick,
	onDoubleClick,
	onRename,
	onDelete,
	onCreateFile,
	onCreateFolder,
}: TreeItemWrapperProps) => {
	return (
		<ContextMenu>
			<ContextMenuTrigger asChild>
				<button
					onClick={onClick}
					onDoubleClick={onDoubleClick}
					onKeyDown={e => {
						if (e.key === 'Enter') {
							e.preventDefault();
							onRename?.();
						}
					}}
					className={cn(
						'group flex h-5.5 w-full items-center gap-1 outline-none hover:bg-accent/30 focus:ring-1 focus:ring-ring focus:ring-inset',
						isActive && 'bg-accent/30',
					)}
					style={{ paddingLeft: getItemPadding(level, item.type === 'file') }}
				>
					{children}
				</button>
			</ContextMenuTrigger>
			<ContextMenuContent
				onCloseAutoFocus={e => e.preventDefault()}
				className="w-[272px]"
			>
				{item.type === 'folder' && (
					<>
						<ContextMenuItem onClick={onCreateFile} className="text-sm">
							New File...
						</ContextMenuItem>
						<ContextMenuItem onClick={onCreateFolder} className="text-sm">
							New Folder...
						</ContextMenuItem>
						<ContextMenuSeparator />
					</>
				)}
				<ContextMenuItem onClick={onRename} className="text-sm">
					Rename...
					<ContextMenuShortcut>Enter</ContextMenuShortcut>
				</ContextMenuItem>
				<ContextMenuItem onClick={onDelete} className="text-sm">
					Delete permanently
					<ContextMenuShortcut>ctrl+Backspace</ContextMenuShortcut>
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
};
