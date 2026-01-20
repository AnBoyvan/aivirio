import { useQuery } from 'convex/react';

import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';

export const useConversations = (projectId: Id<'projects'> | null) => {
	return useQuery(
		api.conversations.getByProject,
		projectId ? { projectId } : 'skip',
	);
};
