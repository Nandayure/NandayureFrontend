import httpClient from '@/helpers/http-client';

import {
  DatesWithRequestsResponse,
  RequestDashboardStatistics,
  EmployeesWithMostRequestsQuery,
  EmployeesWithMostRequestsResponse,
  PeakRequestTimes,
} from '@/types';

const BASE_URL = '/analitics';

/**
 * Obtiene el resumen de solicitudes para el dashboard
 */
export const fetchSummaryRequest = async (): Promise<RequestDashboardStatistics> => {
  return await httpClient.get<RequestDashboardStatistics>(`${BASE_URL}/requestsSummary`);
};

/**
 * Obtiene las fechas que tienen solicitudes registradas
 */
export const fetchDatesWithRequests = async (): Promise<DatesWithRequestsResponse> => {
  return await httpClient.get<DatesWithRequestsResponse>(`${BASE_URL}/DatesWithRequests`);
};

/**
 * Obtiene los empleados con más solicitudes según los parámetros proporcionados
 * @param query Parámetros de consulta (limit, month, year)
 */
export const fetchEmployeesWithMostRequests = async (
  query: EmployeesWithMostRequestsQuery,
): Promise<EmployeesWithMostRequestsResponse> => {
  return await httpClient.post<EmployeesWithMostRequestsResponse>(
    `${BASE_URL}/employeesWithMostRequests`,
    query
  );
};

/**
 * Obtiene las horas pico de solicitudes
 */
export const fetchPeakRequestTimes = async (): Promise<PeakRequestTimes> => {
  return await httpClient.get<PeakRequestTimes>(`${BASE_URL}/peak-request-times`);
}