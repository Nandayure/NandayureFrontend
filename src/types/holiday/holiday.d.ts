/**
 * Tipos para la entidad Holiday
 */

/**
 * Representa un Holiday.
 */
export interface Holiday {
  id: number;
  name: string;
  specificDate?: string;
  recurringMonth?: number;
  recurringDay?: number;
  isActive: boolean;
  isRecurringYearly: boolean;
  createdAt?: string;
  updatedAt?: string | null;
}

/**
 * Tipo para crear un nuevo Holiday.
 */
export type HolidayCreate = Omit<Holiday, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Tipo para actualizar un Holiday.
 */
export type HolidayUpdate = Partial<HolidayCreate>;

/**
 * Lista de Holidays.
 */
export type HolidayList = Holiday[];

/**
 * Estructuras para las peticiones y respuestas relacionadas con Holiday.
 */
export namespace HolidayAPI {
  export namespace Requests {
    export type Create = HolidayCreate;
    export type Update = HolidayUpdate;
  }

  export namespace Responses {
    export type Single = Holiday;
    export type List = HolidayList;
  }

  export namespace Params {
    export type ById = { id: number };
  }
}