import Link from 'next/link';

import type { Doc } from '@/convex/_generated/dataModel';
import { formatTimestamp } from '@/lib/utils/format-timestamp';

import { getProjectIcon } from '../utils/get-project-icon';

interface ProjectItemProps {
	data: Doc<'projects'>;
}

export const ProjectItem = ({ data }: ProjectItemProps) => {
	return (
		<Link
			href={`/projects/${data._id}`}
			className="group flex w-full items-center justify-between py-1 font-medium text-foreground/60 text-sm hover:text-foreground"
		>
			<div className="flex items-center gap-2 overflow-hidden">
				{getProjectIcon({ project: data, size: 'sm' })}
				<span className="truncate">{data.name}</span>
			</div>
			<span className="text-muted-foreground text-xs transition-colors group-hover:text-foreground/60">
				{formatTimestamp(data.updatedAt)}
			</span>
			{/* <ArrowRightIcon /> */}
		</Link>
	);
};
