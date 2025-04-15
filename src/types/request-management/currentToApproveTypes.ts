import { Employee } from '../Employee';
import { RequestSalaryCertificate } from '../request/RequestSalaryCertificate';
import {
  RequestType,
  RequestPaymentConfirmation,
  RequestVacation,
  RequestDetails,
  RequestApprover,
} from './commonTypes';

export interface CurrentToApprove {
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
  Request: RequestDetails;
}

export interface CurrentRequestApproval {
  approved: boolean;
  observation: string;
}
