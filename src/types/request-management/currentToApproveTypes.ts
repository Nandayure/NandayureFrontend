import {
  Employee,
  RequestType,
  RequestSalaryCertificate,
  RequestPaymentConfirmation,
  RequestVacation,
  RequestDetails,
} from './commonTypes';

export interface CurrentToApprove {
  id: number;
  approverId: string;
  Name: string;
  Surname1: string;
  Surname2: string;
  requesterId: string;
  processNumber: number;
  RequestId: number;
  observation: string | null;
  approved: boolean | null;
  current: boolean;
  ApprovedDate: string | null;
  Request: RequestDetails;
}

export interface CurrentRequestApproval {
  approved: boolean;
  observation: string;
}
