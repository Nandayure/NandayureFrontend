import { StudiesCategorySchema } from '@/schemas';
import { postStudiesCategory } from '@/services';
import { StudiesCategory } from '@/types';
import { useCustomMutation } from '@/utils/mutations';
import { notify } from '@/utils/notification';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
type FormsFields = z.infer<typeof StudiesCategorySchema>;

const usePostStudiesCategory = () => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(StudiesCategorySchema),
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const handleAddNew = () => {
    setIsAddModalOpen(true);
  };

  const mutation = useCustomMutation(
    postStudiesCategory,
    'getAllStudiesCategory',
  );

  const onSubmit: SubmitHandler<FormsFields> = async (data) => {
    try {
      const convertData = convertStudiesCategoryTypes(data);
      await notify(mutation.mutateAsync(convertData), {
        loading: 'Guardando categoría de estudio...',
        success: 'Categoría de estudio guardada',
        error: 'Error al guardar categoría de estudio',
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

export default usePostStudiesCategory;

export const convertStudiesCategoryTypes = (
  studiesCategory: any,
): StudiesCategory => {
  return {
    id: studiesCategory.id,
    description: studiesCategory.description,
    weight: studiesCategory.weight,
    Dedication: studiesCategory.Dedication,
    Restriction: studiesCategory.Restriction,
  };
};
