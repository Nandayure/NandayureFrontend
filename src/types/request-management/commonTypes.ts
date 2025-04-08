import { Employee } from '../Employee';

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

export interface PaginatedRequestResponse {
  data: RequestDetails[];
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
