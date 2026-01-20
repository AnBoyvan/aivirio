import { HistoryIcon, PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { Id } from '@/convex/_generated/dataModel';

type ConversationSidebarHeaderProps = {
	title: string;
	projectId: Id<'projects'>;
	onCreate: () => void;
};

export const ConversationSidebarHeader = ({
	title,
	onCreate,
}: ConversationSidebarHeaderProps) => {
	return (
		<div className="flex h-8.75 items-center justify-between border-b">
			<div className="truncate pl-3 text-sm">{title}</div>
			<div className="flex items-center gap-1 px-1">
				<Button size="icon-xs" variant="highlight">
					<HistoryIcon className="size-3.5" />
				</Button>
				<Button size="icon-xs" variant="highlight" onClick={() => onCreate()}>
					<PlusIcon className="size-3.5" />
				</Button>
			</div>
		</div>
	);
};
