import { useState } from 'react';

import { HistoryIcon, PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { Id } from '@/convex/_generated/dataModel';

import { PastConversationDialog } from './past-conversation-dialog';

type ConversationSidebarHeaderProps = {
	title: string;
	projectId: Id<'projects'>;
	onCreate: () => void;
	onSelect: (conversationId: Id<'conversations'>) => void;
};

export const ConversationSidebarHeader = ({
	title,
	projectId,
	onCreate,
	onSelect,
}: ConversationSidebarHeaderProps) => {
	const [pastConversationOpen, setPastConversationOpen] = useState(false);

	return (
		<>
			<PastConversationDialog
				open={pastConversationOpen}
				onOpenChange={setPastConversationOpen}
				projectId={projectId}
				onSelect={onSelect}
			/>
			<div className="flex h-8.75 items-center justify-between border-b">
				<div className="truncate pl-3 text-sm">{title}</div>
				<div className="flex items-center gap-1 px-1">
					<Button
						size="icon-xs"
						variant="highlight"
						onClick={() => setPastConversationOpen(true)}
					>
						<HistoryIcon className="size-3.5" />
					</Button>
					<Button size="icon-xs" variant="highlight" onClick={() => onCreate()}>
						<PlusIcon className="size-3.5" />
					</Button>
				</div>
			</div>
		</>
	);
};
