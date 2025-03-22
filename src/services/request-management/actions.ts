import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';
import { CurrentToApprove } from '@/types';
import { RequestDetails } from '@/types/request-management/commonTypes';

/**
 * Obtiene todas las solicitudes
 * 
 * @returns {Promise<RequestDetails[]>} Promesa que resuelve con la lista de solicitudes
 */
export const getAllRequests = async (): Promise<RequestDetails[]> => {
  return await httpClient.get<RequestDetails[]>(ROUTES.REQUESTS.BASE);
};

/**
 * Obtiene todas las solicitudes de un empleado específico
 * 
 * @param {number} employeeId - ID del empleado
 * @returns {Promise<RequestDetails[]>} Promesa que resuelve con la lista de solicitudes del empleado
 */
export const getAllRequestsById = async (employeeId: number): Promise<RequestDetails[]> => {
  return await httpClient.get<RequestDetails[]>(ROUTES.REQUESTS.BY_EMPLOYEE(employeeId));
};

/**
 * Obtiene las solicitudes pendientes de aprobación
 * 
 * @returns {Promise<CurrentToApprove[]>} Promesa que resuelve con la lista de solicitudes por aprobar
 */
export const getCurrentToApprove = async (): Promise<CurrentToApprove[]> => {
  return await httpClient.get<CurrentToApprove[]>(ROUTES.REQUESTS.CURRENT_TO_APPROVE);
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
  data: { approved: boolean; observation: string }
) => {
  return await httpClient.patch(ROUTES.REQUESTS.APPROVAL(id), data);
};