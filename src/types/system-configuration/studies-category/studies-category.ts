export interface StudiesCategory {
  id: string;
  description: string;
  weight: number;
  Dedication: number;
  Restriction: number;
}

export interface PatchStudiesCategory {
  id?: string;
  description?: string;
  weight?: number;
  Dedication?: number;
  Restriction?: number;
}