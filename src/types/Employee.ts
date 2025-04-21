import { Person } from "./Person";

export interface Employee extends Person {
  id: string;
  HiringDate: string | Date;
  NumberChlidren: number;
  AvailableVacationDays: number;
  MaritalStatusId: number;
  GenderId: number;
  JobPositionId: number;
  JobPosition: {
    id: number;
    Name: string;
    Department: {
      id: number;
      name: string;
    };
  };
  Gender: {
    Name: string;
  }
  MaritalStatus: {
    Name: string;
  };
}