import { inngest } from '@/lib/inngest/client';

export async function POST() {
	await inngest.send({
		name: 'demo/generate',
		data: {},
	});

	return Response.json({ status: 'started' });
}
