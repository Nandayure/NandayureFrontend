import { Person } from "./Person";

export interface UpdateEmployee extends Partial<Person> {
  HiringDate?: string;
  NumberChlidren?: number;
  AvailableVacationDays?: number;
  MaritalStatusId?: number;
  GenderId?: number;
}