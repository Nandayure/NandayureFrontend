import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/services/routes';
import { RequestSalaryCertificate } from '@/types';

/**
 * Obtiene los certificados de salario
 * 
 * @returns {Promise<any>} Promesa que resuelve con la lista de certificados de salario
 */
export const getSalaryCertificates = async (): Promise<any> => {
  return await httpClient.get(ROUTES.SALARY_CERTIFICATES.GET);
};

/**
 * Crea una nueva solicitud de certificado de salario
 * 
 * @param {RequestSalaryCertificate} salaryCertificate - Datos de la solicitud de certificado de salario
 * @returns {Promise<any>} Promesa que resuelve con la respuesta del servidor
 */
export const postSalaryCertificates = async (
  salaryCertificate: RequestSalaryCertificate,
): Promise<any> => {
  return await httpClient.post(ROUTES.SALARY_CERTIFICATES.POST, salaryCertificate);
};