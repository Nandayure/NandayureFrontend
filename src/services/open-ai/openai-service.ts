import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { CHAT_CONTEXT, config } from '@/config/openai.config';

const openai = createOpenAI({
  apiKey: config.openai.apiKey,
});

export async function generateResponse(prompt: string): Promise<string> {
  try {
    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `${CHAT_CONTEXT}\n\nUsuario: ${prompt}`,
    });

    return text;
  } catch (error) {
    throw new Error('Failed to generate text');
  }
}
