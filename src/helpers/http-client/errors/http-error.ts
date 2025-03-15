/**
 * Clase base de error HTTP que representa errores de respuestas de la API
 */
export class HttpError extends Error {
  /**
   * Crea un nuevo error HTTP
   * 
   * @param status - Código de estado HTTP del error
   * @param message - Mensaje de error
   * @param originalError - Objeto de error original, si está disponible
   */
  constructor(
    public readonly status: number,
    public readonly message: string,
    public readonly originalError?: any
  ) {
    super(message);
    this.name = 'HttpError';
  }
}