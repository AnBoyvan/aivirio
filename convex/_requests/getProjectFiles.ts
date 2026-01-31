import { v } from 'convex/values';

import { query } from '../_generated/server';
import { validateInternalKey } from './validateInternalKey';

export const getProjectFiles = query({
	args: {
		internalKey: v.string(),
		projectId: v.id('projects'),
	},
	handler: async (ctx, args) => {
		validateInternalKey(args.internalKey);

		return await ctx.db
			.query('files')
			.withIndex('by_project', q => q.eq('projectId', args.projectId))
			.collect();
	},
});
