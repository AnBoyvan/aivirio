import { useQuery } from 'convex/react';

import { api } from '@/convex/_generated/api';

export const useProjectsPartial = (limit: number) => {
	return useQuery(api.projects.getPartial, { limit });
};
