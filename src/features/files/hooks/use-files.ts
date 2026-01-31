import { useQuery } from 'convex/react';

import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';

export const useFiles = (projectId: Id<'projects'> | null) => {
	return useQuery(api.files.getFiles, projectId ? { projectId } : 'skip');
};
