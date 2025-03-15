import { signOut } from 'next-auth/react';
import { HttpMethod, HttpClientOptions, RequestExecutionOptions } from './types';
import { HttpError, AuthenticationError, NetworkError, TokenExpiredError } from './errors';
import { buildUrl } from './utils/url-builder';
import { getAuthToken } from './utils/auth-utils';

/**
 * Cliente HTTP principal para realizar peticiones a la API
 */
export class HttpClient {
  private baseUrl: string;

  /**
   * Crea un nuevo cliente HTTP
   * 
   * @param baseUrl - URL base para peticiones a la API (por defecto NEXT_PUBLIC_BACKEND_URL)
   */
  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || process.env.NEXT_PUBLIC_BACKEND_URL || '';
  }

  /**
   * Realiza una petición GET al endpoint especificado
   * 
   * @param endpoint - Ruta del endpoint de la API
   * @param options - Opciones de la petición
   * @returns Promesa que resuelve a los datos de respuesta
   */
  public async get<T>(endpoint: string, options: Omit<HttpClientOptions, 'method' | 'endpoint'> = {}): Promise<T> {
    return this.request<T>({
      method: 'GET',
      endpoint,
      ...options,
    });
  }

  /**
   * Realiza una petición POST al endpoint especificado
   * 
   * @param endpoint - Ruta del endpoint de la API
   * @param data - Datos de la petición
   * @param options - Opciones adicionales de la petición
   * @returns Promesa que resuelve a los datos de respuesta
   */
  public async post<T>(
    endpoint: string,
    data?: any,
    options: Omit<HttpClientOptions, 'method' | 'endpoint' | 'data'> = {}
  ): Promise<T> {
    return this.request<T>({
      method: 'POST',
      endpoint,
      data,
      ...options,
    });
  }

  /**
   * Realiza una petición PUT al endpoint especificado
   * 
   * @param endpoint - Ruta del endpoint de la API
   * @param data - Datos de la petición
   * @param options - Opciones adicionales de la petición
   * @returns Promesa que resuelve a los datos de respuesta
   */
  public async put<T>(
    endpoint: string,
    data?: any,
    options: Omit<HttpClientOptions, 'method' | 'endpoint' | 'data'> = {}
  ): Promise<T> {
    return this.request<T>({
      method: 'PUT',
      endpoint,
      data,
      ...options,
    });
  }

  /**
   * Realiza una petición PATCH al endpoint especificado
   * 
   * @param endpoint - Ruta del endpoint de la API
   * @param data - Datos de la petición
   * @param options - Opciones adicionales de la petición
   * @returns Promesa que resuelve a los datos de respuesta
   */
  public async patch<T>(
    endpoint: string,
    data?: any,
    options: Omit<HttpClientOptions, 'method' | 'endpoint' | 'data'> = {}
  ): Promise<T> {
    return this.request<T>({
      method: 'PATCH',
      endpoint,
      data,
      ...options,
    });
  }

  /**
   * Realiza una petición DELETE al endpoint especificado
   * 
   * @param endpoint - Ruta del endpoint de la API
   * @param options - Opciones de la petición
   * @returns Promesa que resuelve a los datos de respuesta
   */
  public async delete<T>(endpoint: string, options: Omit<HttpClientOptions, 'method' | 'endpoint'> = {}): Promise<T> {
    return this.request<T>({
      method: 'DELETE',
      endpoint,
      ...options,
    });
  }

  /**
   * Realiza una petición HTTP con las opciones especificadas
   * 
   * @param options - Opciones de configuración de la petición
   * @returns Promesa que resuelve a los datos de respuesta
   */
  public async request<T>(options: HttpClientOptions): Promise<T> {
    const {
      method,
      endpoint,
      data,
      headers,
      sendToken = true,
      customToken,
      timeout = 10000,
      retries = 1,
      params,
    } = options;

    // Preparar configuración de la petición
    const config = await this.prepareRequestConfig({
      method,
      data,
      headers,
      sendToken,
      customToken,
    });

    const url = buildUrl(endpoint, params);

    // Ejecutar petición con lógica de reintento
    return this.executeRequest<T>(url, config, { timeout, retries });
  }

  /**
   * Prepara la configuración de la petición con cabeceras y cuerpo
   * 
   * @param options - Opciones de preparación de la petición
   * @returns Objeto de configuración de la petición
   */
  private async prepareRequestConfig({
    method,
    data,
    headers,
    sendToken,
    customToken,
  }: Omit<HttpClientOptions, 'endpoint' | 'params' | 'timeout' | 'retries'>): Promise<RequestInit> {
    // Obtener token de autenticación si es necesario
    let token: string | undefined;
    if (sendToken) {
      token = await getAuthToken(customToken);
    }

    // Manejar FormData vs datos JSON
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

  /**
   * Ejecuta una petición HTTP con lógica de reintento
   * 
   * @param url - URL completa de la petición
   * @param config - Configuración de la petición
   * @param options - Opciones de ejecución (timeout y reintentos)
   * @returns Promesa que resuelve a los datos de respuesta
   */
  private async executeRequest<T>(
    url: string,
    config: RequestInit,
    { timeout, retries }: RequestExecutionOptions,
  ): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await this.fetchWithTimeout(url, config, timeout);
        return await this.handleResponse<T>(response);
      } catch (error: any) {
        lastError = error;

        // No reintentar en errores de autenticación
        if (
          error instanceof TokenExpiredError ||
          error instanceof AuthenticationError
        ) {
          throw error;
        }

        // No reintentar en el último intento
        if (attempt === retries) {
          console.error(`Request failed after ${retries + 1} attempts:`, error);
          throw error;
        }

        // Esperar antes de reintentar (retroceso exponencial)
        const delay = Math.min(1000 * Math.pow(2, attempt), 5000);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    throw lastError || new Error('Request failed');
  }

  /**
   * Obtiene una URL con manejo de timeout
   * 
   * @param url - URL de la petición
   * @param config - Configuración de la petición
   * @param timeoutMs - Timeout en milisegundos
   * @returns Promesa que resuelve al objeto Response
   */
  private async fetchWithTimeout(
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

  /**
   * Maneja y analiza la respuesta de la API
   * 
   * @param response - Objeto Response del fetch
   * @returns Promesa que resuelve a los datos de respuesta analizados
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    let responseData: any;

    try {
      // Manejar diferentes tipos de respuesta
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
}