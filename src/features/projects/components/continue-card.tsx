import Link from 'next/link';

import { ArrowRightIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { Doc } from '@/convex/_generated/dataModel';
import { formatTimestamp } from '@/lib/utils/format-timestamp';

import { getProjectIcon } from '../utils/get-project-icon';

interface ContinueCardProps {
	data: Doc<'projects'>;
}

export const ContinueCard = ({ data }: ContinueCardProps) => {
	return (
		<div className="flex flex-col gap-2">
			<span className="text-muted-foreground text-xs">Last updated</span>
			<Button
				variant="outline"
				asChild
				className="flex h-auto flex-col items-start justify-start gap-2 rounded-none border bg-background p-4"
			>
				<Link href={`/projects/${data._id}`} className="group">
					<div className="flex w-full items-center justify-between">
						<div className="flex items-center gap-2 overflow-hidden">
							{getProjectIcon({ project: data, size: 'sm' })}
							<span className="truncate font-medium">{data.name}</span>
						</div>
						<ArrowRightIcon className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
					</div>
					<span className="text-muted-foreground text-xs">
						{formatTimestamp(data.updatedAt)}
					</span>
				</Link>
			</Button>
		</div>
	);
};
