/**
 * Construye una URL completa con parámetros de consulta
 * 
 * @param endpoint - Ruta del endpoint de la API
 * @param params - Parámetros de consulta para añadir a la URL
 * @returns URL completa con parámetros de consulta
 */
export function buildUrl(endpoint: string, params?: Record<string, any>): string {
  const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`;

  if (!params || Object.keys(params).length === 0) {
    return baseUrl;
  }

  // Construir cadena de consulta
  const queryString = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
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
