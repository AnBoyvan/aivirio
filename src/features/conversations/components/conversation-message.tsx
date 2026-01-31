import { CopyIcon, LoaderIcon } from 'lucide-react';

import {
	Message,
	MessageAction,
	MessageActions,
	MessageContent,
	MessageResponse,
} from '@/components/ai-elements/message';
import type { Doc } from '@/convex/_generated/dataModel';

interface ConversationMessageProps {
	message: Doc<'messages'>;
	isLastMessage: boolean;
}

export const ConversationMessage = ({
	message,
	isLastMessage,
}: ConversationMessageProps) => {
	const isLastByAssistantCompleted =
		message.role === 'assistant' &&
		message.status === 'completed' &&
		isLastMessage;

	return (
		<Message key={message._id} from={message.role}>
			<MessageContent>
				{message.status === 'processing' ? (
					<div className="flex items-center gap-2 text-muted-foreground">
						<LoaderIcon className="size-4 animate-spin" />
						<span>Thinking...</span>
					</div>
				) : message.status === 'cancelled' ? (
					<span className="pr-1 text-muted-foreground italic">
						Request cancelled
					</span>
				) : (
					<MessageResponse>{message.content}</MessageResponse>
				)}
			</MessageContent>
			{isLastByAssistantCompleted && (
				<MessageActions>
					<MessageAction
						onClick={() => {
							navigator.clipboard.writeText(message.content);
						}}
						label="Copy"
					>
						<CopyIcon className="size-3" />
					</MessageAction>
				</MessageActions>
			)}
		</Message>
	);
};
