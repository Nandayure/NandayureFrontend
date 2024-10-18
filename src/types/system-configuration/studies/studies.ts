export interface Studies {
  id: string;
  description: string;
  weight: number;
  Dedication: number;
  Restriction: number;
}

export interface PatchStudies {
  id?: string;
  description?: string;
  weight?: number;
  Dedication?: number;
  Restriction?: number;
}