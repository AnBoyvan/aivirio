import { v } from 'convex/values';

import { verifyAuth } from '@/convex/auth';

import { mutation } from '../../_generated/server';

export const renameProject = mutation({
	args: {
		id: v.id('projects'),
		name: v.string(),
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

		await ctx.db.patch('projects', args.id, {
			name: args.name,
			updatedAt: Date.now(),
		});
	},
});
