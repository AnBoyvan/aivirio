import { useMutation } from 'convex/react';

import { api } from '@/convex/_generated/api';

export const useCreateFile = () => {
	return useMutation(api.files.createFile);
};
