import { v } from 'convex/values';
import { query } from '../_generated/server';
import { validateInternalKey } from './validateInternalKey';

export const getProjectFilesWithUrls = query({
	args: {
		internalKey: v.string(),
		projectId: v.id('projects'),
	},
	handler: async (ctx, args) => {
		validateInternalKey(args.internalKey);

		const files = await ctx.db
			.query('files')
			.withIndex('by_project', q => q.eq('projectId', args.projectId))
			.collect();

		return await Promise.all(
			files.map(async file => {
				if (file.storageId) {
					const url = await ctx.storage.getUrl(file.storageId);
					return { ...file, storageUrl: url };
				}
				return { ...file, storageUrl: null };
			}),
		);
	},
});
