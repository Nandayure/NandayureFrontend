import { getSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

interface HttpClientOptions {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  endpoint: string;
  data?: any;
  headers?: HeadersInit;
  sendToken?: boolean;
  customToken?: string;
}

async function httpClient<T>({
  method,
  endpoint,
  data,
  headers,
  sendToken = true,
  customToken,
}: HttpClientOptions): Promise<T> {
  let token: string | undefined;

  if (sendToken) {
    if (customToken) {
      token = customToken;
    } else {
      const session = await getSession();
      token = session?.user?.access_token as string;
    }
  }

  // Verificar si los datos son de tipo FormData
  const isFormData = data instanceof FormData;

  const config: RequestInit = {
    method,
    headers: {
      // Solo establecer 'Content-Type' si no es FormData
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    // Configurar el cuerpo de la solicitud
    body: isFormData ? data : data ? JSON.stringify(data) : undefined,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`,
    config,
  );

  const responseData = await response.json();

  if (!response.ok) {
    if (response.status === 498 && typeof window !== 'undefined') {
      // Handle token expiration properly on client-side
      await signOut({ callbackUrl: '/auth/session-expired' });
      window.location.href = '/auth/session-expired';
      // This throws an error to stop further execution
      throw new Error('Token expired');
    }
    throw new Error(responseData.message || 'Ocurrió un error en la solicitud');
  }

  return responseData as T;
}

export default httpClient;
