import { useState } from 'react';

import { FileIcon, FolderIcon } from '@react-symbols/icons/utils';
import { ChevronRightIcon } from 'lucide-react';

import { getItemPadding } from '../../utils/get-item-padding';

interface CreateInputProps {
	type: 'file' | 'folder';
	level: number;
	onSubmit: (name: string) => void;
	onCancel: () => void;
}

export const CreateInput = ({
	type,
	level,
	onSubmit,
	onCancel,
}: CreateInputProps) => {
	const [value, setValue] = useState('');

	const handleSubmit = () => {
		const trimmedValue = value.trim();
		if (trimmedValue) {
			onSubmit(trimmedValue);
		} else {
			onCancel();
		}
	};

	return (
		<div
			style={{ paddingLeft: getItemPadding(level, type === 'file') }}
			className="flex h-5.5 w-full items-center gap-1 bg-accent/30"
		>
			<div className="flex items-center gap-0.5">
				{type === 'folder' && (
					<ChevronRightIcon className="size-4 shrink-0 text-muted-foreground" />
				)}
				{type === 'file' && (
					<FileIcon fileName={value} autoAssign className="size-4" />
				)}
				{type === 'folder' && (
					<FolderIcon folderName={value} className="size-4" />
				)}
			</div>
			<input
				type="text"
				autoFocus
				value={value}
				onChange={e => setValue(e.target.value)}
				className="flex-1 bg-transparent text-sm outline-none focus:ring-1 focus:ring-ring focus:ring-inset"
				onBlur={handleSubmit}
				onKeyDown={e => {
					if (e.key === 'Enter') {
						handleSubmit();
					} else if (e.key === 'Escape') {
						onCancel();
					}
				}}
			/>
		</div>
	);
};
