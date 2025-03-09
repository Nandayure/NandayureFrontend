/**
 * Tipos para la entidad Folder
 */

/**
 * Representa una carpeta base.
 */
export interface FolderBase {
  mimeType: string;
  iconLink: string;
  webViewLink: string;
  id: string;
  name: string;
}

/**
 * Representa una carpeta completa.
 */
export interface Folder extends FolderBase {
  // Campos adicionales que pueda tener una carpeta
}

/**
 * Lista de carpetas.
 */
export type FolderList = Folder[];

/**
 * Estructuras para las peticiones y respuestas relacionadas con Folders.
 */
export namespace FolderAPI {
  export namespace Requests {
    // No se incluyen Create/Update ya que solo se necesita getAll y get uno
  }

  export namespace Responses {
    export type Single = Folder;
    export type List = FolderList;
  }

  export namespace Params {
    export type ById = { id: string };
  }
}