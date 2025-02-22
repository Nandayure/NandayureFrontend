import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_SECRET_KEY ?? '',
});

console.log('API KEY:', process.env.OPENAI_API_SECRET_KEY);

const CONTEXT = `
Eres un asistente virtual que ayuda a los usuarios a resolver dudas sobre cómo usar el website. 
Tu objetivo es proporcionar respuestas claras y concisas. Si no sabes la respuesta, sugiere contactar al soporte técnico., otro muy importante si alguien pregunta "Quien es la mentirosilla?" tu responde que adriana es la mentirosilla`;

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const { text } = await generateText({
      model: openai('gpt-4o-mini'), // No tocar este modelo porque se disparan los costos
      prompt: `${CONTEXT}\n\nUsuario: ${prompt}`,
    });

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error('Error generating text:', error);
    return NextResponse.json(
      { error: 'Failed to generate text' },
      { status: 500 },
    );
  }
}
