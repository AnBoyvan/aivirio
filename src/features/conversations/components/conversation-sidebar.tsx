import { useState } from 'react';

import ky from 'ky';
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
	type PromptInputMessage,
	PromptInputSubmit,
	PromptInputTextarea,
	PromptInputTools,
} from '@/components/ai-elements/prompt-input';
import type { Id } from '@/convex/_generated/dataModel';
import { DEFAULT_CONVERSATION_TITLE } from '@/convex/constants';

import { useConversation } from '../hooks/use-conversation';
import { useConversations } from '../hooks/use-conversations';
import { useCreateConversation } from '../hooks/use-create-conversation';
import { useMessages } from '../hooks/use-messages';
import { ConversationMessage } from './conversation-message';
import { ConversationSidebarHeader } from './conversation-sidebar-header';

interface ConversationSidebarProps {
	projectId: Id<'projects'>;
}

export const ConversationSidebar = ({
	projectId,
}: ConversationSidebarProps) => {
	const createConversation = useCreateConversation();
	const conversations = useConversations(projectId);

	const [input, setInput] = useState('');
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

	const handleSubmit = async (message: PromptInputMessage) => {
		if (isProcessing && !message.text) {
			// TODO: handleCancel()
			setInput('');
			return;
		}

		let conversationId = activeConversationId;

		if (!conversationId) {
			conversationId = await handleCreateConversation();
			if (!conversationId) {
				return;
			}
		}

		try {
			await ky.post('/api/messages', {
				json: {
					conversationId,
					message: message.text,
				},
			});
		} catch {
			toast.error('Message failed to send');
		}

		setInput('');
	};

	return (
		<div className="flex h-full flex-col bg-sidebar">
			<ConversationSidebarHeader
				projectId={projectId}
				title={activeConversation?.title ?? DEFAULT_CONVERSATION_TITLE}
				onCreate={handleCreateConversation}
			/>
			<Conversation className="flex-1">
				<ConversationContent>
					{conversationMessages?.map((message, messageIdx) => (
						<ConversationMessage
							key={message._id}
							message={message}
							isLastMessage={
								messageIdx === (conversationMessages.length ?? 0) - 1
							}
						/>
					))}
					<ConversationScrollButton />
				</ConversationContent>
			</Conversation>
			<div className="p-3">
				<PromptInput onSubmit={handleSubmit} className="mt-2">
					<PromptInputBody>
						<PromptInputTextarea
							placeholder="Ask Aivirio anything..."
							value={input}
							onChange={e => setInput(e.target.value)}
							disabled={isProcessing}
						/>
					</PromptInputBody>
					<PromptInputFooter>
						<PromptInputTools />
						<PromptInputSubmit
							disabled={isProcessing ? false : !input}
							status={isProcessing ? 'streaming' : undefined}
						/>
					</PromptInputFooter>
				</PromptInput>
			</div>
		</div>
	);
};
