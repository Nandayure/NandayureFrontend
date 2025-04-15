import { Employee } from '../Employee';
import { RequestSalaryCertificate } from '../request/RequestSalaryCertificate';
import {
  RequestType,
  RequestPaymentConfirmation,
  RequestVacation,
  RequestDetails,
} from './commonTypes';

export interface DetailedRequestApproval {
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
