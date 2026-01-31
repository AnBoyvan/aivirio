import { v } from 'convex/values';
import { mutation } from '../_generated/server';
import { validateInternalKey } from './validateInternalKey';

export const createBinaryFile = mutation({
	args: {
		internalKey: v.string(),
		projectId: v.id('projects'),
		name: v.string(),
		storageId: v.id('_storage'),
		parentId: v.optional(v.id('files')),
	},
	handler: async (ctx, args) => {
		validateInternalKey(args.internalKey);

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

		const fileId = await ctx.db.insert('files', {
			projectId: args.projectId,
			name: args.name,
			type: 'file',
			storageId: args.storageId,
			parentId: args.parentId,
			updatedAt: Date.now(),
		});

		return fileId;
	},
});
