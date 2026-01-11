import { AlertCircleIcon, GlobeIcon, Loader2Icon } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

import type { Doc } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils/cn';

interface GetProjectIconProps {
	project: Doc<'projects'>;
	size: 'sm' | 'md';
}

export const getProjectIcon = ({ project, size }: GetProjectIconProps) => {
	if (project.importStatus === 'completed') {
		return (
			<FaGithub
				className={cn(
					'text-muted-foreground',
					size === 'sm' && 'size-3.5',
					size === 'md' && 'size-4',
				)}
			/>
		);
	}

	if (project.importStatus === 'failed') {
		return (
			<AlertCircleIcon
				className={cn(
					'text-muted-foreground',
					size === 'sm' && 'size-3.5',
					size === 'md' && 'size-4',
				)}
			/>
		);
	}

	if (project.importStatus === 'importing') {
		return (
			<Loader2Icon
				className={cn(
					'animate-spin text-muted-foreground',
					size === 'sm' && 'size-3.5',
					size === 'md' && 'size-4',
				)}
			/>
		);
	}

	return (
		<GlobeIcon
			className={cn(
				'text-muted-foreground',
				size === 'sm' && 'size-3.5',
				size === 'md' && 'size-4',
			)}
		/>
	);
};
