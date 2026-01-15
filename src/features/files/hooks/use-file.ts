import { useQuery } from 'convex/react';

import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';

export const useFile = (fileId: Id<'files'> | null) => {
	return useQuery(api.files.getFile, fileId ? { id: fileId } : 'skip');
};
