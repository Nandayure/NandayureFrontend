import { NextResponse } from 'next/server';
import { generateResponse } from '@/services/open-ai/openai-service';

// Almacenamiento para rastrear las solicitudes por IP
const ipRequestMap = new Map<string, { count: number; resetTime: number }>();

// Función para obtener la IP del cliente
function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  return 'unknown-ip';
}

// Función para verificar el rate limit
function checkRateLimit(ip: string): { allowed: boolean; resetTime?: number } {
  const now = Date.now();
  const oneMinute = 60 * 1000;

  // Limpiar entradas antiguas
  for (const [storedIp, data] of ipRequestMap.entries()) {
    if (now > data.resetTime) {
      ipRequestMap.delete(storedIp);
    }
  }

  // Si es la primera petición de esta IP
  if (!ipRequestMap.has(ip)) {
    ipRequestMap.set(ip, {
      count: 1,
      resetTime: now + oneMinute
    });
    return { allowed: true };
  }

  const data = ipRequestMap.get(ip)!;

  // Reiniciar contador si ya pasó el tiempo
  if (now > data.resetTime) {
    ipRequestMap.set(ip, {
      count: 1,
      resetTime: now + oneMinute
    });
    return { allowed: true };
  }

  // Verificar límite de peticiones
  if (data.count >= 5) {
    return { allowed: false, resetTime: data.resetTime };
  }

  // Incrementar contador
  data.count += 1;
  ipRequestMap.set(ip, data);

  return { allowed: true };
}

export async function POST(req: Request) {
  try {
    // Verificar rate limit
    const clientIp = getClientIp(req);
    const rateLimitCheck = checkRateLimit(clientIp);

    if (!rateLimitCheck.allowed) {
      const remainingTime = Math.ceil((rateLimitCheck.resetTime! - Date.now()) / 1000);

      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: `Demasiadas peticiones. Por favor, inténtelo de nuevo en ${remainingTime} segundos.`
        },
        {
          status: 429,
          headers: {
            'Retry-After': remainingTime.toString()
          }
        },
      );
    }

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
