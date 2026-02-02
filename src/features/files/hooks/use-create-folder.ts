import { useMutation } from 'convex/react';

import { api } from '@/convex/_generated/api';

export const useCreateFolder = () => {
	return useMutation(api.files.createFolder);
};
