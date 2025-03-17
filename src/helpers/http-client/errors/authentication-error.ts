import { HttpError } from './http-error';

/**
 * Error que representa fallos de autenticación (estado 401)
 */
export class AuthenticationError extends HttpError {
  /**
   * Crea un nuevo error de autenticación
   * 
   * @param message - Mensaje de error
   * @param originalError - Objeto de error original, si está disponible
   */
  constructor(message: string = 'Authentication failed', originalError?: any) {
    super(401, message, originalError);
    this.name = 'AuthenticationError';
  }
}

/**
 * Error que representa tokens de autenticación expirados (estado 498)
 */
export class TokenExpiredError extends HttpError {
  /**
   * Crea un nuevo error de token expirado
   * 
   * @param message - Mensaje de error
   * @param originalError - Objeto de error original, si está disponible
   */
  constructor(message: string = 'Session expired', originalError?: any) {
    super(498, message, originalError);
    this.name = 'TokenExpiredError';
  }
}