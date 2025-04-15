import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';
import { CurrentToApprove, RequestCancelled } from '@/types';
import { RequestDetails } from '@/types/request-management/commonTypes';

interface GetRequestsParams {
  RequestStateId?: number;
  RequestTypeId?: number;
  startDate?: string;
  endDate?: string;
  limit?: number;
  page?: number;
}

interface PaginatedResponse {
  data: RequestDetails[];
  totalItems: number;
  limit: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Obtiene todas las solicitudes con paginación y filtros
 *
 * @param {GetRequestsParams} params - Parámetros de consulta
 * @returns {Promise<PaginatedResponse>} Promesa que resuelve con la lista paginada de solicitudes
 */
export const getAllRequests = async (
  params?: GetRequestsParams,
): Promise<PaginatedResponse> => {
  const queryParams = new URLSearchParams();

  if (params) {
    if (params.RequestStateId)
      queryParams.append('RequestStateId', params.RequestStateId.toString());
    if (params.RequestTypeId)
      queryParams.append('RequestTypeId', params.RequestTypeId.toString());
    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.page) queryParams.append('page', params.page.toString());
  }

  const queryString = queryParams.toString();
  const url = queryString
    ? `${ROUTES.REQUESTS.BASE}?${queryString}`
    : ROUTES.REQUESTS.BASE;

  return await httpClient.get<PaginatedResponse>(url);
};

/**
 * Obtiene todas las solicitudes de un empleado específico
 *
 * @param {number} employeeId - ID del empleado
 * @returns {Promise<RequestDetails[]>} Promesa que resuelve con la lista de solicitudes del empleado
 */
export const getAllRequestsById = async (
  employeeId: number,
): Promise<RequestDetails[]> => {
  return await httpClient.get<RequestDetails[]>(ROUTES.REQUESTS.BY_EMPLOYEE);
};

/**
 * Obtiene las solicitudes pendientes de aprobación
 *
 * @returns {Promise<CurrentToApprove[]>} Promesa que resuelve con la lista de solicitudes por aprobar
 */
export const getCurrentToApprove = async (): Promise<CurrentToApprove[]> => {
  return await httpClient.get<CurrentToApprove[]>(
    ROUTES.REQUESTS.CURRENT_TO_APPROVE,
  );
};

/**
 * Actualiza el estado de aprobación de una solicitud
 *
 * @param {number} id - ID de la solicitud
 * @param {Object} data - Datos de aprobación
 * @param {boolean} data.approved - Indica si la solicitud fue aprobada
 * @param {string} data.observation - Observaciones sobre la solicitud
 * @returns {Promise<any>} Promesa que resuelve con la respuesta del servidor
 */
export const patchRequestApproval = async (
  id: number,
  data: { approved: boolean; observation: string },
) => {
  return await httpClient.patch(ROUTES.REQUESTS.APPROVAL(id), data);
};

/**
 * Cancela una solicitud
 *
 * @param {number} id - ID de la solicitud
 * @param {string} reason - Razón de la cancelación
 * @returns {Promise<void>} Promesa que resuelve con la respuesta del servidor
 */
export const cancelRequest = async (id: number, CancelledReason: string): Promise<void> => {
  return await httpClient.patch(ROUTES.REQUESTS.CANCELLED(id), { CancelledReason });
};