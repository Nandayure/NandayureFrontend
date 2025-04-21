import { Person } from "./Person";

export interface Department {
  id: number;
  name: string;
}

export interface JobPosition {
  id: number;
  Name: string;
  Department: Department;
}

export interface Gender {
  id: number;
  Name: string;
}

export interface MaritalStatus {
  id: number;
  Name: string;
}

export interface Employee extends Person {
  id: string;
  HiringDate: string | Date;
  NumberChlidren: number;
  AvailableVacationDays: number;
  MaritalStatusId: number;
  GenderId: number;
  JobPositionId: number;
  JobPosition: JobPosition;
  Gender: Gender;
  MaritalStatus: MaritalStatus;
}