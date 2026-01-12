import { v } from 'convex/values';

import { verifyAuth } from '@/convex/auth';

import { query } from '../../_generated/server';

export const getProjectById = query({
	args: {
		id: v.id('projects'),
	},
	handler: async (ctx, args) => {
		const identity = await verifyAuth(ctx);

		const project = await ctx.db.get('projects', args.id);

		if (!project) {
			throw new Error('Project not found');
		}

		if (project.ownerId !== identity.subject) {
			throw new Error('Unauthorized access to this project');
		}

		return project;
	},
});
