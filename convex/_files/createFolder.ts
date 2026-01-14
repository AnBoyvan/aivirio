import { v } from 'convex/values';

import { verifyAuth } from '@/convex/auth';

import { mutation } from '../_generated/server';

export const createFolder = mutation({
	args: {
		projectId: v.id('projects'),
		parentId: v.optional(v.id('files')),
		name: v.string(),
	},
	handler: async (ctx, args) => {
		const identity = await verifyAuth(ctx);

		const project = await ctx.db.get('projects', args.projectId);

		if (!project) {
			throw new Error('Project not found');
		}

		if (project.ownerId !== identity.subject) {
			throw new Error('Unauthorized access to this project');
		}

		const files = await ctx.db
			.query('files')
			.withIndex('by_project_parent', q =>
				q.eq('projectId', args.projectId).eq('parentId', args.parentId),
			)
			.collect();

		const existing = files.find(
			file => file.name === args.name && file.type === 'folder',
		);

		if (existing) {
			throw new Error('Folder already exists');
		}

		const now = Date.now();

		await ctx.db.insert('files', {
			projectId: args.projectId,
			name: args.name,
			type: 'folder',
			parentId: args.parentId,
			updatedAt: now,
		});

		await ctx.db.patch('projects', args.projectId, {
			updatedAt: now,
		});
	},
});
