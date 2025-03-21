import { JobPosition, PatchJobPosition } from '@/types';
import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/services/routes';

/**
 * Propiedades para actualizar un puesto de trabajo
 */
interface PatchJobPositionProps {
  /**
   * ID del puesto de trabajo a actualizar
   */
  jobPositionId: number;

  /**
   * Datos para actualizar el puesto de trabajo
   */
  jobPosition: PatchJobPosition;
}

/**
 * Crea un nuevo puesto de trabajo
 * 
 * @param {JobPosition} data - Datos del puesto de trabajo a crear
 * @returns {Promise<JobPosition>} Promesa que resuelve con el puesto de trabajo creado
 */
export const postJobPosition = async (data: JobPosition): Promise<JobPosition> => {
  return await httpClient.post<JobPosition>(ROUTES.JOB_POSITIONS.BASE, data);
};

/**
 * Actualiza un puesto de trabajo existente
 * 
 * @param {PatchJobPositionProps} props - Propiedades para actualizar el puesto de trabajo
 * @returns {Promise<JobPosition>} Promesa que resuelve con el puesto de trabajo actualizado
 */
export const patchJobPosition = async ({
  jobPositionId,
  jobPosition,
}: PatchJobPositionProps): Promise<JobPosition> => {
  return await httpClient.patch<JobPosition>(
    ROUTES.JOB_POSITIONS.BY_ID(jobPositionId),
    jobPosition
  );
};

/**
 * Elimina un puesto de trabajo
 * 
 * @param {number} jobPositionId - ID del puesto de trabajo a eliminar
 * @returns {Promise<void>} Promesa que se resuelve cuando se completa la eliminación
 */
export const deleteJobPosition = async (jobPositionId: number): Promise<void> => {
  await httpClient.delete(ROUTES.JOB_POSITIONS.BY_ID(jobPositionId));
};