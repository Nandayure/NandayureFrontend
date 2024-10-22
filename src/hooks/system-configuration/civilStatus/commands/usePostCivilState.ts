import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { notify } from '@/utils/notification'; 
import { z } from 'zod';
import { useCustomMutation } from '@/utils/mutations';
import { CivilStatusSchema } from '@/schemas';
import { CivilStatus } from '@/types';
import { postCivilStatus } from '@/services';

type FormsFields = z.infer<typeof CivilStatusSchema>;

const usePostCivilStatus = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(CivilStatusSchema),
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const handleAddNew = () => {
    setIsAddModalOpen(true);
  };

  const mutation = useCustomMutation(postCivilStatus, 'getAllCivilStatus');

  const onSubmit: SubmitHandler<FormsFields> = async (data) => {
    try {
      const convertData = convertCivilStatusTypes(data);
      await notify(
        mutation.mutateAsync(convertData),
        {
          loading: 'Guardando estado civil...',
          success: 'Estado civil guardado',
          error: 'Error al guardar estado civil',
        },
      );
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
    setIsAddModalOpen,
    handleAddNew,
    errors,
  };
};

export default usePostCivilStatus;

export const convertCivilStatusTypes = (civilStatus: any): CivilStatus => {
  return {
    id: civilStatus.id,
    Name: civilStatus.Name,
    Description: civilStatus.Description,

  };
};
