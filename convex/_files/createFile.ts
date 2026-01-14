import { v } from 'convex/values';

import { verifyAuth } from '@/convex/auth';

import { mutation } from '../_generated/server';

export const createFile = mutation({
	args: {
		projectId: v.id('projects'),
		parentId: v.optional(v.id('files')),
		name: v.string(),
		content: v.string(),
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
			file => file.name === args.name && file.type === 'file',
		);

		if (existing) {
			throw new Error('File already exists');
		}

		const now = Date.now();

		await ctx.db.insert('files', {
			projectId: args.projectId,
			name: args.name,
			content: args.content,
			type: 'file',
			parentId: args.parentId,
			updatedAt: now,
		});

		await ctx.db.patch('projects', args.projectId, {
			updatedAt: now,
		});
	},
});
