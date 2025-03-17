/**
 * Métodos HTTP soportados para las peticiones
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * Opciones de configuración para peticiones HTTP
 */
export interface HttpClientOptions {
  /** Método HTTP a utilizar */
  method: HttpMethod;

  /** Ruta del endpoint de la API (se añadirá a la URL base) */
  endpoint: string;

  /** Datos para enviar en la petición (para métodos POST, PUT, PATCH) */
  data?: any;

  /** Cabeceras adicionales para la petición */
  headers?: HeadersInit;

  /** Si se debe incluir el token de autenticación en la petición */
  sendToken?: boolean;

  /** Token personalizado a usar en lugar del token de sesión */
  customToken?: string;

  /** Tiempo máximo de espera en milisegundos */
  timeout?: number;

  /** Número de reintentos para peticiones fallidas */
  retries?: number;

  /** Parámetros de consulta para añadir a la URL */
  params?: Record<string, any>;
}

/**
 * Configuración para la ejecución de peticiones
 */
export interface RequestExecutionOptions {
  /** Tiempo máximo de espera en milisegundos */
  timeout: number;

  /** Número de reintentos */
  retries: number;
}