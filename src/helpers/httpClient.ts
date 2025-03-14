import { getSession, signOut } from 'next-auth/react';
import {
  AuthenticationError,
  HttpError,
  NetworkError,
  TokenExpiredError,
} from './httpErrors';

interface HttpClientOptions {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  endpoint: string;
  data?: any;
  headers?: HeadersInit;
  sendToken?: boolean;
  customToken?: string;
  timeout?: number; 
  retries?: number;
  params?: Record<string, any>; 
}

async function httpClient<T>({
  method,
  endpoint,
  data,
  headers,
  sendToken = true,
  customToken,
  timeout = 10000, 
  retries = 1,
  params, // Añadido para soportar parámetros de consulta
}: HttpClientOptions): Promise<T> {
  // Prepare request configuration
  const config = await prepareRequestConfig({
    method,
    data,
    headers,
    sendToken,
    customToken,
  });
  const url = buildUrl(endpoint, params); 

  // Execute request with retry logic
  return executeRequest<T>(url, config, { timeout, retries });
}

async function prepareRequestConfig({
  method,
  data,
  headers,
  sendToken,
  customToken,
}: Omit<HttpClientOptions, 'endpoint' | 'params'>): Promise<RequestInit> {
  // Get authentication token if needed
  let token: string | undefined;
  if (sendToken) {
    token = await getAuthToken(customToken);
  }

  // Handle FormData vs JSON data
  const isFormData = data instanceof FormData;

  return {
    method,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    body: isFormData ? data : data ? JSON.stringify(data) : undefined,
  };
}

async function getAuthToken(customToken?: string): Promise<string | undefined> {
  if (customToken) {
    return customToken;
  }
  const session = await getSession();
  return session?.user?.access_token;
}

// Función modificada para soportar parámetros de consulta
function buildUrl(endpoint: string, params?: Record<string, any>): string {
  const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`;
  
  if (!params || Object.keys(params).length === 0) {
    return baseUrl;
  }

  // Construir la cadena de consulta
  const queryString = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null) // Filtrar valores undefined/null
    .map(([key, value]) => {
      // Manejar arrays y objetos
      if (Array.isArray(value)) {
        return value.map(item => `${encodeURIComponent(key)}=${encodeURIComponent(String(item))}`).join('&');
      } else if (typeof value === 'object') {
        return `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`;
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
    })
    .join('&');

  return `${baseUrl}${queryString ? `?${queryString}` : ''}`;
}

async function executeRequest<T>(
  url: string,
  config: RequestInit,
  { timeout, retries }: { timeout: number; retries: number },
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, config, timeout);
      return await handleResponse<T>(response);
    } catch (error: any) {
      lastError = error;

      // Don't retry on authentication errors
      if (
        error instanceof TokenExpiredError ||
        error instanceof AuthenticationError
      ) {
        throw error;
      }

      // Don't retry on the last attempt
      if (attempt === retries) {
        console.error(`Request failed after ${retries + 1} attempts:`, error);
        throw error;
      }

      // Wait before retrying (exponential backoff)
      const delay = Math.min(1000 * Math.pow(2, attempt), 5000);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError || new Error('Request failed');
}

async function fetchWithTimeout(
  url: string,
  config: RequestInit,
  timeoutMs: number,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...config,
      signal: controller.signal,
    });
    return response;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new NetworkError(`Request timeout after ${timeoutMs}ms`);
    }
    throw new NetworkError('Network request failed', error);
  } finally {
    clearTimeout(timeoutId);
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  let responseData: any;

  try {
    // Handle different response types
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      responseData = await response.json();
    } else if (contentType?.includes('text/')) {
      responseData = await response.text();
    } else {
      responseData = await response.blob();
    }
  } catch (error) {
    throw new HttpError(response.status, 'Failed to parse response', error);
  }

  if (!response.ok) {
    if (response.status === 498 && typeof window !== 'undefined') {
      await signOut({ callbackUrl: '/auth/session-expired' });
      window.location.href = '/auth/session-expired';
      throw new TokenExpiredError('Your session has expired');
    }

    throw new HttpError(
      response.status,
      responseData?.message || `Request failed with status ${response.status}`,
      responseData,
    );
  }

  return responseData as T;
}

export default httpClient;