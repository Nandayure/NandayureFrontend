interface RequestApproval {
  id: number;
  approverId: string | null;
  Name: string | null;
  Surname1: string | null;
  Surname2: string | null;
  requesterId: string;
  processNumber: number;
  RequestId: number;
  observation: string | null;
  approved: boolean | null;
  current: boolean;
  ApprovedDate: string | null;
}

interface RequestVacation {
  id: number;
  daysRequested: number;
  departureDate: string;
  entryDate: string;
  RequestId: number;
}

//Those two are the same but I'm not sure if they will be the same in the future
interface RequestSalaryCertificate {
  id: number;
  reason: string;
  RequestId: number;
}
interface RequestPaymentConfirmation {
  id: number;
  reason: string;
  RequestId: number;
}

interface RequestType {
  id: number;
  name: string;
}

export interface RequestDetails {
  id: number;
  date: string;
  RequestStateId: number;
  RequestTypeId: number;
  EmployeeId: string;
  Name: string;
  Surname1: string;
  Surname2: string;
  RequestType: RequestType;
  RequestApprovals: RequestApproval[];
  RequestVacation: RequestVacation | null;
  RequestSalaryCertificate: RequestSalaryCertificate | null;
  RequestPaymentConfirmation: RequestPaymentConfirmation | null;
}

export interface currentToApprove {
  id: number;
  approverId: string;
  requesterId: string;
  processNumber: number;
  RequestId: number;
  observation?: string | null;
  approved?: boolean | null;
  current: boolean;
  ApprovedDate?: string | null;
  Request: RequestDetails;
}

export interface currentRequestApproval {
  approved: boolean;
  observation: string;
}
