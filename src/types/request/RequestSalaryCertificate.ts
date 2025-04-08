export interface RequestSalaryCertificate {
  id: number;
  reason: string;
  RequestId: number;
  date?: string;
}

export interface RequestSalaryCertificateForm {
  reason: string;
  date: string;
}
