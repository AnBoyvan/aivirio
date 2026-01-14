import { v } from 'convex/values';

import { verifyAuth } from '@/convex/auth';

import { query } from '../_generated/server';

export const getFolderContents = query({
	args: {
		projectId: v.id('projects'),
		parentId: v.optional(v.id('files')),
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

		return files.sort((a, b) => {
			if (a.type === 'folder' && b.type === 'file') return -1;
			if (a.type === 'file' && b.type === 'folder') return 1;

			return a.name.localeCompare(b.name);
		});
	},
});
