import httpClient from '@/helpers/httpClient';
import {
  DatesWithRequestsResponse,
  RequestDashboardStatistics,
  EmployeesWithMostRequestsQuery,
  EmployeesWithMostRequestsResponse,
} from '@/types';

const BASE_URL = '/analitics';

/**
 * Obtiene el resumen de solicitudes para el dashboard
 */
export const fetchSummaryRequest =
  async (): Promise<RequestDashboardStatistics> => {
    return await httpClient<RequestDashboardStatistics>({
      method: 'GET',
      endpoint: `${BASE_URL}/requestsSummary`,
    });
  };

/**
 * Obtiene las fechas que tienen solicitudes registradas
 */
export const fetchDatesWithRequests =
  async (): Promise<DatesWithRequestsResponse> => {
    return await httpClient<DatesWithRequestsResponse>({
      method: 'GET',
      endpoint: `${BASE_URL}/DatesWithRequests`,
    });
  };

/**
 * Obtiene los empleados con más solicitudes según los parámetros proporcionados
 * @param query Parámetros de consulta (limit, month, year)
 */
export const fetchEmployeesWithMostRequests = async (
  query: EmployeesWithMostRequestsQuery,
): Promise<EmployeesWithMostRequestsResponse> => {
  return await httpClient<EmployeesWithMostRequestsResponse>({
    method: 'POST',
    endpoint: `${BASE_URL}/employeesWithMostRequests`,
    data: query,
  });
};
