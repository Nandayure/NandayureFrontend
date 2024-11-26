// hooks/usePostAnnuity.ts

import { AnnuitySchema } from '@/schemas';
import { postAnnuity } from '@/services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { notify } from '@/utils/notification';
import { z } from 'zod';

type FormsFields = z.infer<typeof AnnuitySchema>;

const usePostAnnuity = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(AnnuitySchema),
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postAnnuity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllAnnuities'] });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || 'Error al guardar anualidad';
      setError('root', { type: 'manual', message: errorMessage });
    },
  });
  const onSubmit: SubmitHandler<FormsFields> = async (data) => {
    const formattedData = {
      Date: data.Date,
      Description: data.Description,
      Amount: data.Amount,
      EmployeeId: Number(data.EmployeeId), 
    };
  
    try {
      await notify(
        mutation.mutateAsync(formattedData),
        {
          loading: 'Guardando anualidad...',
          success: 'Anualidad guardada',
          error: 'Error al guardar anualidad',
        }
      );
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error al intentar guardar la anualidad:", error);
    }
  };
  
  

  return {
    onSubmit,
    register,
    handleSubmit,
    isAddModalOpen,
    setIsAddModalOpen,
    errors,
  };
};

export default usePostAnnuity;
