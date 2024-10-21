import { UpdateStudySchema } from '@/schemas';
import { postStudy } from '@/services';
import { Study } from '@/types';
import { useCustomMutation } from '@/utils/mutations';
import { notify } from '@/utils/notification';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

type FormsFields = z.infer<typeof UpdateStudySchema>;

const usePostStudy = () => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(UpdateStudySchema),
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddNew = () => {
    setIsAddModalOpen(true);
  };

  const mutation = useCustomMutation(postStudy, 'getAllStudies');

  const onSubmit: SubmitHandler<FormsFields> = async (data) => {
    try {
      const convertData = convertStudyTypes(data);
      await notify(mutation.mutateAsync(convertData), {
        loading: 'Guardando estudio...',
        success: 'Estudio guardado',
        error: 'Error al guardar estudio',
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

export default usePostStudy;

export const convertStudyTypes = (study: any): Study => {
  return {
    id: study.id,
    name: study.name,
    StudyCategoryId: study.StudyCategoryId,
  };
};
