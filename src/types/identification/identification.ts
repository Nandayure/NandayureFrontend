export interface CrIdentificationResponse {
  cedula: string;
  user: string;
  query: string;
  results: CrIdentificationResult[];
  tipoIdentificacion: string;
  resultcount: number;
  license: string;
  database_date: string;
  nombre: string;
}

export interface CrIdentificationResult {
  cedula: string;
  firstname1: string;
  guess_type_num: string;
  type: string;
  lastname: string;
  class: string;
  firstname: string;
  lastname1: string;
  firstname2: string;
  guess_type: string;
  fullname: string;
  admin: string;
  rawcedula: string;
  lastname2: string;
  temp: string | null;
}