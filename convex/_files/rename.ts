import { v } from 'convex/values';

import { verifyAuth } from '@/convex/auth';

import { mutation } from '../_generated/server';

export const rename = mutation({
	args: {
		id: v.id('files'),
		newName: v.string(),
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

		const siblings = await ctx.db
			.query('files')
			.withIndex('by_project_parent', q =>
				q.eq('projectId', file.projectId).eq('parentId', file.parentId),
			)
			.collect();

		const existing = siblings.find(
			sibling =>
				sibling.name === args.newName &&
				sibling.type === file.type &&
				sibling._id !== args.id,
		);

		if (existing) {
			throw new Error(
				`A ${file.type} with this name already exists in this location`,
			);
		}

		const now = Date.now();

		await ctx.db.patch('files', args.id, {
			name: args.newName,
			updatedAt: now,
		});

		await ctx.db.patch('projects', file.projectId, {
			updatedAt: now,
		});
	},
});
