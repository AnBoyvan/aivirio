import { anthropic, createAgent, createNetwork } from '@inngest/agent-kit';
import { NonRetriableError } from 'inngest';

import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';
import { ANTHROPIC_HAIKU_MODEL } from '@/lib/constants';
import { convex } from '@/lib/convex/convex-client';
import { inngest } from '@/lib/inngest/client';

import {
	CODE_GENERATION_MAX_TOKENS,
	CODE_GENERATION_TEMPERATURE,
	DEFAULT_CONVERSATION_TITLE,
	NETWORK_MAX_ITERATIONS,
	RECENT_MESSAGES_LIMIT,
	TITLE_GENERATION_MAX_TOKENS,
	TITLE_GENERATION_TEMPERATURE,
} from '../constants';
import { CODING_AGENT_SYSTEM_PROMPT } from '../prompts/coding-agent-system-prompt';
import { TITLE_GENERATOR_SYSTEM_PROMPT } from '../prompts/title-generator-system-prompt';
import { createCreateFilesTool } from './tools/create-files';
import { createCreateFolderTool } from './tools/create-folder';
import { createListFilesTool } from './tools/list-files';
import { createReadFilesTool } from './tools/read-files';
import { createRemoveFilesTool } from './tools/remove-files';
import { createRenameFileTool } from './tools/rename-file';
import { createScrapeUrlsTool } from './tools/scrape-urls';
import { createUpdateFileTool } from './tools/update-file';

interface MessageEvent {
	messageId: Id<'messages'>;
	conversationId: Id<'conversations'>;
	projectId: Id<'projects'>;
	message: string;
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

			// Update the message with error content
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
		const { messageId, conversationId, projectId, message } =
			event.data as MessageEvent;

		const internalKey = process.env.CONVEX_INTERNAL_KEY;

		if (!internalKey) {
			throw new NonRetriableError('CONVEX_INTERNAL_KEY is not configured');
		}

		await step.sleep('wait-for-db-sync', '2s');

		// Get conversation for title generation check
		const conversation = await step.run('get-conversation', async () => {
			return await convex.query(api.requests.getConversationById, {
				internalKey,
				conversationId,
			});
		});

		if (!conversation) {
			throw new NonRetriableError('Conversation not found');
		}

		// Fetch recent messages for conversation context
		const recentMessages = await step.run('get-recent-messages', async () => {
			return await convex.query(api.requests.getRecentMessages, {
				internalKey,
				conversationId,
				limit: RECENT_MESSAGES_LIMIT,
			});
		});

		// Build system prompt with conversation history (exclude the current processing message)
		let systemPrompt = CODING_AGENT_SYSTEM_PROMPT;

		// Filter out the current processing message and empty messages
		const contextMessages = recentMessages.filter(
			msg => msg._id !== messageId && msg.content.trim() !== '',
		);

		if (contextMessages.length > 0) {
			const historyText = contextMessages
				.map(msg => `${msg.role.toUpperCase()}: ${msg.content}`)
				.join('\n\n');

			systemPrompt += `\n\n## Previous Conversation (for context only - do NOT repeat these responses):\n${historyText}\n\n## Current Request:\nRespond ONLY to the user's new message below. Do not repeat or reference your previous responses.`;
		}

		// Generate conversation title if it's still the default
		const shouldGenerateTitle =
			conversation.title === DEFAULT_CONVERSATION_TITLE;

		if (shouldGenerateTitle) {
			const titleAgent = createAgent({
				name: 'title-generator',
				system: TITLE_GENERATOR_SYSTEM_PROMPT,
				model: anthropic({
					model: ANTHROPIC_HAIKU_MODEL,
					defaultParameters: {
						temperature: TITLE_GENERATION_TEMPERATURE,
						max_tokens: TITLE_GENERATION_MAX_TOKENS,
					},
				}),
			});

			const { output } = await titleAgent.run(message, { step });

			const textMessage = output.find(
				m => m.type === 'text' && m.role === 'assistant',
			);

			if (textMessage?.type === 'text') {
				const title =
					typeof textMessage.content === 'string'
						? textMessage.content.trim()
						: textMessage.content
								.map(c => c.text)
								.join('')
								.trim();

				if (title) {
					await step.run('update-conversation-title', async () => {
						await convex.mutation(api.requests.updateConversationTitle, {
							internalKey,
							conversationId,
							title,
						});
					});
				}
			}
		}

		// Create the coding agent with file tools
		const codingAgent = createAgent({
			name: 'aivirio',
			description: 'An expert AI coding assistant',
			system: systemPrompt,
			model: anthropic({
				model: ANTHROPIC_HAIKU_MODEL,
				defaultParameters: {
					temperature: CODE_GENERATION_TEMPERATURE,
					max_tokens: CODE_GENERATION_MAX_TOKENS,
				},
			}),
			tools: [
				createListFilesTool({ internalKey, projectId }),
				createReadFilesTool({ internalKey }),
				createUpdateFileTool({ internalKey }),
				createCreateFilesTool({ projectId, internalKey }),
				createCreateFolderTool({ projectId, internalKey }),
				createRenameFileTool({ internalKey }),
				createRemoveFilesTool({ internalKey }),
				createScrapeUrlsTool(),
			],
		});

		// Create network with single agent
		const network = createNetwork({
			name: 'aivirio-network',
			agents: [codingAgent],
			maxIter: NETWORK_MAX_ITERATIONS,
			router: ({ network }) => {
				const lastResult = network.state.results.at(-1);
				const hasTextResponse = lastResult?.output.some(
					m => m.type === 'text' && m.role === 'assistant',
				);
				const hasToolCalls = lastResult?.output.some(
					m => m.type === 'tool_call',
				);

				// Anthropic outputs text AND tool calls together
				// Only stop if there's text WITHOUT tool calls (final response)
				if (hasTextResponse && !hasToolCalls) {
					return undefined;
				}

				return codingAgent;
			},
		});

		// Run the agent
		const result = await network.run(message);

		// Extract the assistant's text response from the last agent result
		const lastResult = result.state.results.at(-1);
		const textMessage = lastResult?.output.find(
			m => m.type === 'text' && m.role === 'assistant',
		);

		let assistantResponse =
			'I processed your request. Let me know if you need anything else!';

		if (textMessage?.type === 'text') {
			assistantResponse =
				typeof textMessage.content === 'string'
					? textMessage.content
					: textMessage.content.map(c => c.text).join('');
		}

		// Update the assistant message with the response (this also sets status to completed)
		await step.run('update-assistant-message', async () => {
			await convex.mutation(api.requests.updateMessageContent, {
				internalKey,
				messageId,
				content: assistantResponse,
			});
		});

		return { success: true, messageId, conversationId };
	},
);
