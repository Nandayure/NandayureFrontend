/**
 * Tipos para la entidad FAQ Categories
 */

/**
 * Representa una categoría de FAQ.
 */
export interface FaqCategory {
  id: number;
  name: string;
}

/**
 * Tipo para crear una nueva categoría de FAQ.
 */
export type FaqCategoryCreate = Omit<FaqCategory, 'id'>;

/**
 * Tipo para actualizar una categoría de FAQ.
 */
export type FaqCategoryUpdate = Partial<FaqCategoryCreate>;

/**
 * Lista de categorías de FAQ.
 */
export type FaqCategoryList = FaqCategory[];

/**
 * Estructuras para las peticiones y respuestas relacionadas con FAQ Categories.
 */
export namespace FaqCategoryAPI {
  export namespace Requests {
    export type Create = FaqCategoryCreate;
    export type Update = FaqCategoryUpdate;
  }

  export namespace Responses {
    export type Single = FaqCategory;
    export type List = FaqCategoryList;
  }

  export namespace Params {
    export type ById = { id: number };
  }
}
