import { v } from 'convex/values';

import { mutation } from '../_generated/server';
import { validateInternalKey } from './validateInternalKey';

export const createFiles = mutation({
	args: {
		internalKey: v.string(),
		projectId: v.id('projects'),
		parentId: v.optional(v.id('files')),
		files: v.array(
			v.object({
				name: v.string(),
				content: v.string(),
			}),
		),
	},
	handler: async (ctx, args) => {
		validateInternalKey(args.internalKey);

		const existingFiles = await ctx.db
			.query('files')
			.withIndex('by_project_parent', q =>
				q.eq('projectId', args.projectId).eq('parentId', args.parentId),
			)
			.collect();

		const results: { name: string; fileId: string; error?: string }[] = [];

		for (const file of args.files) {
			const existing = existingFiles.find(
				f => f.name === file.name && f.type === 'file',
			);

			if (existing) {
				results.push({
					name: file.name,
					fileId: existing._id,
					error: 'File already exists',
				});
				continue;
			}

			const fileId = await ctx.db.insert('files', {
				projectId: args.projectId,
				name: file.name,
				content: file.content,
				type: 'file',
				parentId: args.parentId,
				updatedAt: Date.now(),
			});

			results.push({ name: file.name, fileId });
		}

		return results;
	},
});
