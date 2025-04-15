import { JobPositionSchema } from '@/schemas';
import { postJobPosition } from '@/services';
import { JobPosition } from '@/types';
import { useCustomMutation } from '@/utils/mutations';
import { notify } from '@/utils/notification';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

type FormsFields = z.infer<typeof JobPositionSchema>;

const usePostJobPosition = () => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(JobPositionSchema),
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddNew = () => {
    setIsAddModalOpen(true);
  };

  const mutation = useCustomMutation(postJobPosition, 'getAllJobPositions');

  const onSubmit: SubmitHandler<FormsFields> = async (data) => {
    try {
      const convertData = convertJobPositionTypes(data);
      await notify(mutation.mutateAsync(convertData), {
        loading: 'Guardando puesto de trabajo...',
        success: 'Puesto de trabajo guardado',
        error: 'Error al guardar puesto de trabajo',
      });
      setIsAddModalOpen(false);
    } catch (error: any) {
      console.error('Error en onSubmit:', error.message);
      setError('root', {
        type: 'manual',
        message: error.message,
      });
    }
  };

  return {
    onSubmit,
    register,
    mutation,
    handleSubmit,
    isAddModalOpen,
    setValue,
    setIsAddModalOpen,
    handleAddNew,
    errors,
  };
};

export default usePostJobPosition;

export const convertJobPositionTypes = (jobPosition: any): JobPosition => {
  return {
    id: jobPosition.id,
    Name: jobPosition.Name,
    Description: jobPosition.Description,
    DepartmentId: jobPosition.DepartmentId,
  };
};
