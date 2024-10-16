import { DepartmentProgramSchema } from '@/schemas';
import { postDepartmentProgram } from '@/services';
import { DepartmentProgram } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

type FormsFields = z.infer<typeof DepartmentProgramSchema>;

const usePostDepartamentProgram = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(DepartmentProgramSchema),
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const handleAddNew = () => {
    setIsAddModalOpen(true);
  };

  const mutation = useMutation({
    mutationFn: async (data: any) => await postDepartmentProgram(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllDepartmentPrograms'] });
    },
    onError: (error: any) => {
      console.error(error);
      setError('root', {
        type: 'manual',
        message: error.message,
      });
    },
  });

  const onSubmit: SubmitHandler<FormsFields> = async (data) => {
    try {
      const convertData = convertDepartmentProgramTypes(data);
      await toast.promise(
        new Promise((resolve, reject) => {
          setTimeout(async () => {
            try {
              await mutation.mutateAsync(convertData);
              setIsAddModalOpen(false);
              resolve('Programa departamental guardado');
            } catch (error) {
              reject('Error al guardar programa departamental');
            }
          }, 500);
        }),
        {
          loading: 'Guardando programa departamental...',
          success: 'Programa departamental guardado',
          error: 'Error al guardar programa departamental',
        },
        { duration: 2500 },
      );
    } catch (error: any) {
      console.error('Error en onSubmit:', error.message);
      setError('root', {
        type: 'manual',
        message: error.message,
      });
      toast.error('Error al guardar programa departamental');
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

export default usePostDepartamentProgram;

export const convertDepartmentProgramTypes = (
  departament: any,
): DepartmentProgram => {
  return {
    id: departament.id,
    name: departament.name,
  };
};
