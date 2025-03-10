export interface RequestTypeChartData {
  name: string;
  total: number;
  percentage: number;
}

export interface RequestStatusChartData {
  status: string;
  total: number;
}

export interface RequestDashboardStatistics {
  vacationRequests: RequestTypeChartData;
  salaryCertificateRequests: RequestTypeChartData;
  paymentConfirmationRequests: RequestTypeChartData;
  totalApproved: RequestStatusChartData;
  totalRejected: RequestStatusChartData;
  totalPending: RequestStatusChartData;
  totalRequests: number;
  lastUpdated: string;
}
