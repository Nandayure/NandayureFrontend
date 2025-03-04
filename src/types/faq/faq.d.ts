/**
 * Tipos para la entidad FAQ
 */

/**
 * Representa un FAQ.
 */
export interface Faq {
  id: number;
  question: string;
  answer: string;
  status: string;
  faqCategoryId: number;
  created_at?: string;
  updated_at?: string | null;
}

/**
 * Tipo para crear un nuevo FAQ.
 */
export type FaqCreate = Omit<Faq, 'id' | 'created_at' | 'updated_at'>;

/**
 * Tipo para actualizar un FAQ.
 */
export type FaqUpdate = Partial<FaqCreate>;

/**
 * Lista de FAQs.
 */
export type FaqList = Faq[];

/**
 * Estructuras para las peticiones y respuestas relacionadas con FAQ.
 */
export namespace FaqAPI {
  export namespace Requests {
    export type Create = FaqCreate;
    export type Update = FaqUpdate;
  }

  export namespace Responses {
    export type Single = Faq;
    export type List = FaqList;
  }

  export namespace Params {
    export type ById = { id: number };
  }
}
