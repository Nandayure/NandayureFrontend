import { NextResponse } from 'next/server';
import { generateResponse } from '@/services/open-ai/openai-service';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 },
      );
    }

    const response = await generateResponse(prompt);

    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
