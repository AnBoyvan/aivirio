import { NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs/server';
import z from 'zod';

import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';
import { convex } from '@/lib/convex/convex-client';
import { inngest } from '@/lib/inngest/client';

const requestSchema = z.object({
	projectId: z.string(),
});

export async function POST(request: Request) {
	const { userId } = await auth();

	if (!userId) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const body = await request.json();
	const { projectId } = requestSchema.parse(body);

	const internalKey = process.env.CONVEX_INTERNAL_KEY;

	if (!internalKey) {
		return NextResponse.json(
			{ error: 'Internal key not configured' },
			{ status: 500 },
		);
	}

	const processingMessages = await convex.query(
		api.requests.getProcessingMessages,
		{
			projectId: projectId as Id<'projects'>,
			internalKey,
		},
	);

	if (processingMessages.length === 0) {
		return NextResponse.json({ success: true, cancelled: false });
	}

	const cancelledIds = Promise.all(
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

			return msg._id;
		}),
	);

	return NextResponse.json({
		success: true,
		cancelled: true,
		messageIds: cancelledIds,
	});
}
