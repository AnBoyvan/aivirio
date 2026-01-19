import { NextResponse } from 'next/server';

import { anthropic } from '@ai-sdk/anthropic';
import { auth } from '@clerk/nextjs/server';
import { generateText, Output } from 'ai';

import { SUGGESTION_PROMPT } from '@/features/editor/prompts/suggestion-prompt';
import { suggestionSchema } from '@/features/editor/schemas/suggestion-schema';

export async function POST(request: Request) {
	try {
		const { userId } = await auth();

		if (!userId) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
		}

		const {
			fileName,
			code,
			currentLine,
			previousLines,
			textBeforeCursor,
			textAfterCursor,
			nextLines,
			lineNumber,
		} = await request.json();

		if (!code) {
			return NextResponse.json({ error: 'Code is required' }, { status: 400 });
		}

		const prompt = SUGGESTION_PROMPT.replace('{fileName}', fileName)
			.replace('{code}', code)
			.replace('{currentLine}', currentLine)
			.replace('{previousLines}', previousLines || '')
			.replace('{textBeforeCursor}', textBeforeCursor)
			.replace('{textAfterCursor}', textAfterCursor)
			.replace('{nextLines}', nextLines || '')
			.replace('{lineNumber}', lineNumber.toString());

		const { output } = await generateText({
			model: anthropic('claude-3-haiku-20240307'),
			output: Output.object({ schema: suggestionSchema }),
			prompt,
		});

		return NextResponse.json({ suggestion: output.suggestion });
	} catch {
		return NextResponse.json(
			{ error: 'Failed to generate suggestion' },
			{ status: 500 },
		);
	}
}
