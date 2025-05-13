import type { RequestSalaryCertificate } from '../request/RequestSalaryCertificate';

export type { RequestSalaryCertificate };

export interface RequestType {
  id: number;
  name: string;
}

export interface RequestPaymentConfirmation {
  id: number;
  reason: string;
  date: string;
  RequestId: number;
}

export interface RequestVacation {
  id: number;
  daysRequested: number;
  departureDate: string;
  entryDate: string;
  RequestId: number;
}

export interface RequestVacationForm {
  departureDate: string;
  entryDate: string;
}

export interface RequestApprover {
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
  deletedAt: string | null;
}

export interface RequestApproval {
  id: number;
  approverId: string;
  requesterId: string;
  processNumber: number;
  RequestId: number;
  observation: string | null;
  approved: boolean | null;
  current: boolean;
  ApprovedDate: string | null;
  approver: RequestApprover;
}

export interface RequestStatus {
  id: number;
  Name: string;
}

interface EmployeeDetails {
  id: string;
  Name: string;
  Surname1: string;
  Surname2: string;
  Email: string;
}



export interface RequestDetails {
  id: number;
  date: string;
  RequestStateId: number;
  RequestTypeId: number;
  CancelledReason: string | null;
  EmployeeId: string;
  Employee: EmployeeDetails;
  RequestApprovals: RequestApproval[];
  RequestType: RequestType;
  RequestStatus: RequestStatus;
  RequestVacation: RequestVacation | null;
  RequestSalaryCertificate: RequestSalaryCertificate | null;
  RequestPaymentConfirmation: RequestPaymentConfirmation | null;
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
