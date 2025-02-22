import { NextResponse } from 'next/server';
import logger from '@/utils/logger';
import { generateResponse } from '@/services/open-ai/openai-service';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      logger.warn('Prompt is required');
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 },
      );
    }

    const response = await generateResponse(prompt);

    return NextResponse.json({ response });
  } catch (error) {
    logger.error('Error in POST /api/chat:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
