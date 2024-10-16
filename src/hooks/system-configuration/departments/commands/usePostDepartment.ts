import { DepartmentSchema } from '@/schemas';
import { postDepartment } from '@/services';
import { Department } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

type FormsFields = z.infer<typeof DepartmentSchema>;

const usePostDepartament = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(DepartmentSchema),
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const handleAddNew = () => {
    setIsAddModalOpen(true);
  };

  const mutation = useMutation({
    mutationFn: async (data: Department) => await postDepartment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllDepartments'] });
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
      const convertData = convertDepartmentTypes(data);
      await toast.promise(
        new Promise((resolve, reject) => {
          setTimeout(async () => {
            try {
              await mutation.mutateAsync(convertData);
              setIsAddModalOpen(false);
              resolve('Departamento guardado');
            } catch (error) {
              reject('Error al guardar departamento');
            }
          }, 500);
        }),
        {
          loading: 'Guardando departamento...',
          success: 'Departamento guardado',
          error: 'Error al guardar departamento',
        },
        { duration: 2500 },
      );
    } catch (error: any) {
      console.error('Error en onSubmit:', error.message);
      setError('root', {
        type: 'manual',
        message: error.message,
      });
      toast.error('Error al guardar departamento');
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

export default usePostDepartament;

export const convertDepartmentTypes = (departament: any): Department => {
  return {
    id: departament.id,
    name: departament.name,
    description: departament.description,
    departmentHeadId: departament.departmentHeadId,
    budgetCodeId: parseInt(departament.budgetCodeId, 10),
    departmentProgramId: parseInt(departament.departmentProgramId, 10),
  };
};
