import { DepartmentProgramSchema } from '@/schemas';
import { postDepartmentProgram } from '@/services';
import { DepartmentProgram } from '@/types';
import { useCustomMutation } from '@/utils/mutations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { notify } from '@/utils/notification'; 
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
  const handleAddNew = () => {
    setIsAddModalOpen(true);
  };

  const mutation = useCustomMutation(
    postDepartmentProgram,
    'getAllDepartmentPrograms',
  );

  const onSubmit: SubmitHandler<FormsFields> = async (data) => {
    try {
      const convertData = convertDepartmentProgramTypes(data);
      await notify(mutation.mutateAsync(convertData), {
        loading: 'Guardando programa departamental...',
        success: 'Programa departamental guardado',
        error: 'Error al guardar programa departamental',
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
