import { NextResponse } from 'next/server';

import { anthropic } from '@ai-sdk/anthropic';
import { auth } from '@clerk/nextjs/server';
import { generateText, Output } from 'ai';

import { URL_REGEX } from '@/features/editor/constants';
import { QUICK_EDIT_PROMPT } from '@/features/editor/prompts/quick-edit-prompt';
import { quickEditSchema } from '@/features/editor/schemas/quick-edit-schema';
import { firecrawl } from '@/lib/firecrawl/firecrawl';
import { ANTHROPIC_HAIKU_MODEL } from '@/lib/constants';

export async function POST(request: Request) {
	try {
		const { userId } = await auth();
		const { selectedCode, fullCode, instruction } = await request.json();

		if (!userId) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
		}

		if (!selectedCode) {
			return NextResponse.json(
				{ error: 'Selected code is required' },
				{ status: 400 },
			);
		}

		if (!instruction) {
			return NextResponse.json(
				{ error: 'Instructions are required' },
				{ status: 400 },
			);
		}

		const urls: string[] = instruction.match(URL_REGEX) || [];
		let documentationContext = '';

		if (urls.length > 0) {
			const scrappedResults = await Promise.all(
				urls.map(async url => {
					try {
						const result = await firecrawl.scrape(url, {
							formats: ['markdown'],
						});

						if (result.markdown) {
							return `<doc url="${url}"\n${result.markdown}>\n</doc>`;
						}

						return null;
					} catch {
						return null;
					}
				}),
			);

			const validResults = scrappedResults.filter(Boolean);

			if (validResults.length > 0) {
				documentationContext = `<documentation>\n${validResults.join('\n\n')}\n</documentation>`;
			}
		}

		const prompt = QUICK_EDIT_PROMPT.replace('{selectedCode}', selectedCode)
			.replace('{fullCode}', fullCode)
			.replace('{instruction}', instruction)
			.replace('{documentation}', documentationContext);

		const { output } = await generateText({
			model: anthropic(ANTHROPIC_HAIKU_MODEL),
			output: Output.object({ schema: quickEditSchema }),
			prompt,
		});

		return NextResponse.json({ editedCode: output.editedCode });
	} catch {
		return NextResponse.json(
			{ error: 'Failed to fetch AI quick edit' },
			{ status: 500 },
		);
	}
}
