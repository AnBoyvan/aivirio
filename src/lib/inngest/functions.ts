import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';

import { firecrawl } from '../firecrawl/firecrawl';
import { inngest } from './client';

const URL_REGEX = /https?:\/\/[^\s]+/g;

export const demoGenerate = inngest.createFunction(
	{ id: 'demo-generate' },
	{ event: 'demo/generate' },
	async ({ event, step }) => {
		const { prompt } = event.data as { prompt: string };

		const urls = (await step.run('extract-urls', async () => {
			return prompt.match(URL_REGEX) ?? [];
		})) as string[];

		const scrappedContent = await step.run('scrape-urls', async () => {
			const results = await Promise.all(
				urls.map(async url => {
					const result = await firecrawl.scrape(url, {
						formats: ['markdown'],
					});
					return result.markdown ?? null;
				}),
			);

			return results.filter(Boolean).join('\n\n');
		});

		const finalPrompt = scrappedContent
			? `Context:\n${scrappedContent}\n\nQuestion: ${prompt}`
			: prompt;

		await step.run('generate-text', async () => {
			return await generateText({
				model: anthropic('claude-3-haiku-20240307'),
				prompt: finalPrompt,
				experimental_telemetry: {
					isEnabled: true,
					recordInputs: true,
					recordOutputs: true,
				},
			});
		});
	},
);
