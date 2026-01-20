import { useState } from 'react';

import ky from 'ky';
import { HistoryIcon, PlusIcon } from 'lucide-react';
import { toast } from 'sonner';

import {
	Conversation,
	ConversationContent,
	ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import {
	PromptInput,
	PromptInputBody,
	PromptInputFooter,
	PromptInputSubmit,
	PromptInputTextarea,
	PromptInputTools,
} from '@/components/ai-elements/prompt-input';
import { Button } from '@/components/ui/button';
import type { Id } from '@/convex/_generated/dataModel';
import { DEFAULT_CONVERSATION_TITLE } from '@/convex/constants';

import { useConversation } from '../hooks/use-conversation';
import { useConversations } from '../hooks/use-conversations';
import { useCreateConversation } from '../hooks/use-create-conversation';
import { useMessages } from '../hooks/use-messages';

interface ConversationSidebarProps {
	projectId: Id<'projects'>;
}

export const ConversationSidebar = ({
	projectId,
}: ConversationSidebarProps) => {
	const createConversation = useCreateConversation();
	const conversations = useConversations(projectId);

	const [selectedConversationId, setSelectedConversationId] =
		useState<Id<'conversations'> | null>(null);

	const activeConversationId =
		selectedConversationId ?? conversations?.[0]?._id ?? null;

	const activeConversation = useConversation(activeConversationId);
	const conversationMessages = useMessages(activeConversationId);

	const isProcessing = conversationMessages?.some(
		msg => msg.status === 'processing',
	);

	const handleCreateConversation = async () => {
		try {
			const newConversationId = await createConversation({
				projectId,
				title: DEFAULT_CONVERSATION_TITLE,
			});
			setSelectedConversationId(newConversationId);
			return newConversationId;
		} catch {
			toast.error('Unable to create new conversation');
			return null;
		}
	};

	return (
		<div className="flex h-full flex-col bg-sidebar">
			<div className="flex h-8.75 items-center justify-between border-b">
				<div className="truncate pl-3 text-sm">
					{activeConversation?.title ?? DEFAULT_CONVERSATION_TITLE}
				</div>
				<div className="flex items-center gap-1 px-1">
					<Button size="icon-xs" variant="highlight">
						<HistoryIcon className="size-3.5" />
					</Button>
					<Button
						size="icon-xs"
						variant="highlight"
						onClick={handleCreateConversation}
					>
						<PlusIcon className="size-3.5" />
					</Button>
				</div>
			</div>
			<Conversation className="flex-1">
				<ConversationContent>
					<p>messages</p>
					<ConversationScrollButton />
				</ConversationContent>
			</Conversation>
			<div className="p-3">
				<PromptInput onSubmit={() => {}} className="mt-2">
					<PromptInputBody>
						<PromptInputTextarea
							placeholder="Ask Aivirio anything..."
							value=""
							onChange={() => {}}
							disabled={false}
						/>
					</PromptInputBody>
					<PromptInputFooter>
						<PromptInputTools />
						<PromptInputSubmit disabled={false} status="ready" />
					</PromptInputFooter>
				</PromptInput>
			</div>
		</div>
	);
};
