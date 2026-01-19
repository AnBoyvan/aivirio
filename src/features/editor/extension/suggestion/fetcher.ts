import ky from 'ky';
import { toast } from 'sonner';

import {
	type SuggestionRequest,
	suggestionRequestSchema,
} from '../../schemas/suggestion-request-schema';
import {
	type SuggestionResponse,
	suggestionResponseSchema,
} from '../../schemas/suggestion-response-schema';

export const fetcher = async (
	payload: SuggestionRequest,
	signal: AbortSignal,
): Promise<string | null> => {
	try {
		const validatedPayload = suggestionRequestSchema.parse(payload);

		const response = await ky
			.post('/api/suggestion', {
				json: validatedPayload,
				signal,
				timeout: 10000,
				retry: 0,
			})
			.json<SuggestionResponse>();

		const validatedResponse = suggestionResponseSchema.parse(response);

		return validatedResponse.suggestion || null;
	} catch (error) {
		if (error instanceof Error && error.name === 'AbortError') {
			return null;
		}
		toast.error('Failed to fetch AI completion');
		return null;
	}
};
