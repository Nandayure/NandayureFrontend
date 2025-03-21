import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/services/routes';
import { RequestPaySlip } from '@/types';

/**
 * Obtiene los comprobantes de pago
 * 
 * @returns {Promise<any>} Promesa que resuelve a la lista de comprobantes de pago
 */
export const getPaySlip = async (): Promise<any> => {
  return await httpClient.get(ROUTES.PAY_SLIP.BASE);
};

/**
 * Crea un nuevo comprobante de pago
 * 
 * @param {RequestPaySlip} paySlip - Datos del comprobante de pago
 * @returns {Promise<any>} Promesa que resuelve con la respuesta del servidor
 */
export const postPaySlip = async (paySlip: RequestPaySlip): Promise<any> => {
  return await httpClient.post(ROUTES.PAY_SLIP.BASE, paySlip);
};