import { DepartmentSchema } from '@/schemas';
import { postDepartment } from '@/services';
import { Department } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { notify } from '@/utils/notification'; 
import { z } from 'zod';
import { useCustomMutation } from '@/utils/mutations';

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
  const handleAddNew = () => {
    setIsAddModalOpen(true);
  };

  const mutation = useCustomMutation(postDepartment, 'getAllDepartments');

  const onSubmit: SubmitHandler<FormsFields> = async (data) => {
    try {
      const convertData = convertDepartmentTypes(data);
      await notify(
        mutation.mutateAsync(convertData),
        {
          loading: 'Guardando departamento...',
          success: 'Departamento guardado',
          error: 'Error al guardar departamento',
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
