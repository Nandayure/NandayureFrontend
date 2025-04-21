/**
 * Interfaz para los filtros de búsqueda de archivos
 */
export interface GetFilesFilterDto {
  /**
   * Token de paginación para obtener la siguiente página
   */
  pageToken?: string;

  /**
   * Límite de resultados por página (1-100)
   */
  limit?: number;

  /**
   * Campo por el cual ordenar (modifiedTime, name)
   */
  orderBy?: 'modifiedTime' | 'name';

  /**
   * Dirección del ordenamiento
   */
  orderDirection?: 'asc' | 'desc';

  /**
   * Término de búsqueda para filtrar por nombre
   */
  name?: string;
}