import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';
import { RequestSalaryCertificateForm } from '@/types/request/RequestSalaryCertificate';

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
 * @param {RequestSalaryCertificateForm} salaryCertificate - Datos de la solicitud de certificado de salario
 * @returns {Promise<any>} Promesa que resuelve con la respuesta del servidor
 */
export const postSalaryCertificates = async (
  salaryCertificate: RequestSalaryCertificateForm,
): Promise<any> => {
  return await httpClient.post(
    ROUTES.SALARY_CERTIFICATES.POST,
    salaryCertificate,
  );
};
