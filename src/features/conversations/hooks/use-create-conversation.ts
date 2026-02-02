import { useMutation } from 'convex/react';

import { api } from '@/convex/_generated/api';

export const useCreateConversation = () => {
	return useMutation(api.conversations.create);
};
