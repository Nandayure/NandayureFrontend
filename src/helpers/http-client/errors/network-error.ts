/**
 * Error que representa problemas de conectividad de red
 */
export class NetworkError extends Error {
  /**
   * Crea un nuevo error de red
   * 
   * @param message - Mensaje de error
   * @param originalError - Objeto de error original, si está disponible
   */
  constructor(message: string = 'Network error', public readonly originalError?: any) {
    super(message);
    this.name = 'NetworkError';
  }
}