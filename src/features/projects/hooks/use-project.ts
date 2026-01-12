import { useQuery } from 'convex/react';

import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';

export const useProject = (projectId: Id<'projects'>) => {
	return useQuery(api.projects.getById, { id: projectId });
};
