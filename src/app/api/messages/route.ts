import { NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs/server';

import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';
import { messageRequestSchema } from '@/features/conversations/schemas/message-request-schema';
import { convex } from '@/lib/convex/convex-client';
import { inngest } from '@/lib/inngest/client';

export async function POST(request: Request) {
	const { userId } = await auth();

	if (!userId) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const internalKey = process.env.CONVEX_INTERNAL_KEY;

	if (!internalKey) {
		return NextResponse.json(
			{ error: 'Internal key not configured' },
			{ status: 500 },
		);
	}

	const body = await request.json();
	const { conversationId, message } = messageRequestSchema.parse(body);

	const conversation = await convex.query(api.requests.getConversationById, {
		internalKey,
		conversationId: conversationId as Id<'conversations'>,
	});

	if (!conversation) {
		return NextResponse.json(
			{ error: 'Conversation not found' },
			{ status: 404 },
		);
	}

	const projectId = conversation.projectId;

	const processingMessages = await convex.query(
		api.requests.getProcessingMessages,
		{
			projectId,
			internalKey,
		},
	);

	if (processingMessages.length === 0) {
		Promise.all(
			processingMessages.map(async msg => {
				await inngest.send({
					name: 'message/cancel',
					data: {
						messageId: msg._id,
					},
				});

				await convex.mutation(api.requests.updateMessageStatus, {
					internalKey,
					messageId: msg._id,
					status: 'cancelled',
				});
			}),
		);
	}

	await convex.mutation(api.requests.createMessage, {
		internalKey,
		conversationId: conversationId as Id<'conversations'>,
		projectId,
		role: 'user',
		content: message,
	});

	const assistantMessageId = await convex.mutation(api.requests.createMessage, {
		internalKey,
		conversationId: conversationId as Id<'conversations'>,
		projectId,
		role: 'assistant',
		content: '',
		status: 'processing',
	});

	const event = await inngest.send({
		name: 'message/sent',
		data: {
			messageId: assistantMessageId,
			conversationId,
			projectId,
			message,
		},
	});

	return NextResponse.json({
		success: true,
		eventId: event.ids[0],
		messageId: assistantMessageId,
	});
}
