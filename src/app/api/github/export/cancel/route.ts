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
			{ error: 'Server configuration error' },
			{ status: 500 },
		);
	}

	const event = await inngest.send({
		name: 'github/export.cancel',
		data: {
			projectId,
		},
	});

	await convex.mutation(api.requests.updateExportStatus, {
		internalKey,
		projectId: projectId as Id<'projects'>,
		status: 'cancelled',
	});

	return NextResponse.json({
		success: true,
		projectId,
		eventId: event.ids[0],
	});
}
