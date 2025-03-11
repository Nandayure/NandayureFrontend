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

export interface YearWithMonths {
  year: number;
  months: number[];
}

export type DatesWithRequestsResponse = YearWithMonths[];

export interface EmployeesWithMostRequestsQuery {
  limit: number;
  month: number;
  year: number;
}

export interface EmployeeWithRequests {
  employeeId: string;
  name: string;
  surname1: string;
  surname2: string;
  totalRequests: string;
}

export type EmployeesWithMostRequestsResponse = EmployeeWithRequests[];
