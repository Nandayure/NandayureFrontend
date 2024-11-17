export interface Employee {
  id: string;
  Name: string;
  Surname1: string;
  Surname2: string;
  Birthdate: string;
  HiringDate: string;
  Email: string;
  CellPhone: string;
  NumberChlidren: number;
  AvailableVacationDays: number;
  JobPositionId: number;
  GenderId: number;
  MaritalStatusId: number;
  EmbargoId: number | null;
  deletedAt: string | null;
}

export interface RequestType {
  id: number;
  name: string;
}

export interface RequestSalaryCertificate {
  id: number;
  reason: string;
  RequestId: number;
}

export interface RequestPaymentConfirmation {
  id: number;
  reason: string;
  RequestId: number;
}

export interface RequestVacation {
  id: number;
  daysRequested: number;
  departureDate: string;
  entryDate: string;
  RequestId: number;
}

export interface RequestDetails {
  RequestApprovals: any;
  id: number;
  date: string;
  RequestStateId: number;
  RequestTypeId: number;
  EmployeeId: string;
  RequestType: RequestType;
  Employee: Employee;
  RequestSalaryCertificate: RequestSalaryCertificate | null;
  RequestPaymentConfirmation: RequestPaymentConfirmation | null;
  RequestVacation: RequestVacation | null;
}