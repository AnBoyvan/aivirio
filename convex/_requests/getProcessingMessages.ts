import { v } from 'convex/values';

import { query } from '../_generated/server';
import { validateInternalKey } from './validateInternalKey';

export const getProcessingMessages = query({
	args: {
		projectId: v.id('projects'),
		internalKey: v.string(),
	},
	handler: async (ctx, args) => {
		validateInternalKey(args.internalKey);

		return await ctx.db
			.query('messages')
			.withIndex('by_project_status', q =>
				q.eq('projectId', args.projectId).eq('status', 'processing'),
			)
			.collect();
	},
});
