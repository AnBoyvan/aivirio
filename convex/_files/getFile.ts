import { v } from 'convex/values';

import { verifyAuth } from '@/convex/auth';

import { query } from '../_generated/server';

export const getFile = query({
	args: {
		id: v.id('files'),
	},
	handler: async (ctx, args) => {
		const identity = await verifyAuth(ctx);

		const file = await ctx.db.get('files', args.id);

		if (!file) {
			throw new Error('File not found');
		}

		const project = await ctx.db.get('projects', file.projectId);

		if (!project) {
			throw new Error('Project not found');
		}

		if (project.ownerId !== identity.subject) {
			throw new Error('Unauthorized access to this project');
		}

		return file;
	},
});
