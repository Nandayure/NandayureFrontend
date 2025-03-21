import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/services/routes';
import { CivilStatus, PatchCivilStatus } from '@/types';

/**
 * Propiedades para actualizar un estado civil
 */
interface PatchCivilStatusProps {
    /**
     * ID del estado civil a actualizar
     */
    civilStatusId: number;

    /**
     * Datos para actualizar el estado civil
     */
    civilStatus: PatchCivilStatus;
}

/**
 * Crea un nuevo estado civil
 * 
 * @param {CivilStatus} data - Datos del estado civil a crear
 * @returns {Promise<CivilStatus>} Promesa que resuelve con el estado civil creado
 */
export const postCivilStatus = async (data: CivilStatus): Promise<CivilStatus> => {
    return await httpClient.post<CivilStatus>(ROUTES.CIVIL_STATUS.BASE, data);
};

/**
 * Actualiza un estado civil existente
 * 
 * @param {PatchCivilStatusProps} props - Propiedades para actualizar el estado civil
 * @returns {Promise<CivilStatus>} Promesa que resuelve con el estado civil actualizado
 */
export const patchCivilStatus = async ({
    civilStatusId,
    civilStatus,
}: PatchCivilStatusProps): Promise<CivilStatus> => {
    return await httpClient.patch<CivilStatus>(
        ROUTES.CIVIL_STATUS.BY_ID(civilStatusId),
        civilStatus
    );
};

/**
 * Elimina un estado civil
 * 
 * @param {number} civilStatusId - ID del estado civil a eliminar
 * @returns {Promise<void>} Promesa que se resuelve cuando se completa la eliminación
 */
export const deleteCivilStatus = async (civilStatusId: number): Promise<void> => {
    await httpClient.delete(ROUTES.CIVIL_STATUS.BY_ID(civilStatusId));
};