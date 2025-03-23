import httpClient from '@/helpers/http-client';
import {
  DatesWithRequestsResponse,
  RequestDashboardStatistics,
  EmployeesWithMostRequestsQuery,
  EmployeesWithMostRequestsResponse,
  PeakRequestTimes,
} from '@/types';
import { ROUTES } from '../../constants/api-routes/routes';

/**
 * Obtiene el resumen de solicitudes para el dashboard
 * 
 * @returns {Promise<RequestDashboardStatistics>} Estadísticas de solicitudes del dashboard
 */
export const fetchSummaryRequest = async (): Promise<RequestDashboardStatistics> => {
  return await httpClient.get<RequestDashboardStatistics>(ROUTES.ANALYTICS.REQUESTS_SUMMARY);
};

/**
 * Obtiene las fechas que tienen solicitudes registradas
 * 
 * @returns {Promise<DatesWithRequestsResponse>} Fechas con solicitudes
 */
export const fetchDatesWithRequests = async (): Promise<DatesWithRequestsResponse> => {
  return await httpClient.get<DatesWithRequestsResponse>(ROUTES.ANALYTICS.DATES_WITH_REQUESTS);
};

/**
 * Obtiene los empleados con más solicitudes según los parámetros proporcionados
 * 
 * @param {EmployeesWithMostRequestsQuery} query - Parámetros de consulta (limit, month, year)
 * @returns {Promise<EmployeesWithMostRequestsResponse>} Lista de empleados con más solicitudes
 */
export const fetchEmployeesWithMostRequests = async (
  query: EmployeesWithMostRequestsQuery,
): Promise<EmployeesWithMostRequestsResponse> => {
  return await httpClient.post<EmployeesWithMostRequestsResponse>(
    ROUTES.ANALYTICS.EMPLOYEES_WITH_MOST_REQUESTS,
    query
  );
};

/**
 * Obtiene las horas pico de solicitudes
 * 
 * @returns {Promise<PeakRequestTimes>} Horas pico de las solicitudes
 */
export const fetchPeakRequestTimes = async (): Promise<PeakRequestTimes> => {
  return await httpClient.get<PeakRequestTimes>(ROUTES.ANALYTICS.PEAK_REQUEST_TIMES);
};