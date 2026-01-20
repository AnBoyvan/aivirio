import { NonRetriableError } from 'inngest';

import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';
import { convex } from '@/lib/convex/convex-client';
import { inngest } from '@/lib/inngest/client';

interface MessageEvent {
	messageId: Id<'messages'>;
}

export const processMessage = inngest.createFunction(
	{
		id: 'process-message',
		cancelOn: [
			{
				event: 'message/cancel',
				if: 'event.data.messageId == async.data.messageId',
			},
		],
		onFailure: async ({ event, step }) => {
			const { messageId } = event.data.event.data as MessageEvent;

			const internalKey = process.env.CONVEX_INTERNAL_KEY;

			if (internalKey) {
				await step.run('update-message-on-failure', async () => {
					await convex.mutation(api.requests.updateMessageContent, {
						internalKey,
						messageId,
						content:
							'My apologises, I encountered an error while processing your request. Let me know if you need anything else!',
					});
				});
			}
		},
	},
	{
		event: 'message/sent',
	},
	async ({ event, step }) => {
		const { messageId } = event.data as MessageEvent;

		const internalKey = process.env.CONVEX_INTERNAL_KEY;

		if (!internalKey) {
			throw new NonRetriableError('CONVEX_INTERNAL_KEY is not configured');
		}

		await step.sleep('wait-for-ai-processing', '5s');

		await step.run('update-assistant-message', async () => {
			await convex.mutation(api.requests.updateMessageContent, {
				internalKey,
				messageId,
				content: 'AI processed this message (TODO:)',
			});
		});
	},
);
