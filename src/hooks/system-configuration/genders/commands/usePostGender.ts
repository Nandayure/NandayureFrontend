import { GenderSchema } from '@/schemas/system-configuration/GenderSchema';
import { postGender } from '@/services';
import { Gender } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { notify } from '@/utils/notification';
import { z } from 'zod';
import { useCustomMutation } from '@/utils/mutations';

type FormsFields = z.infer<typeof GenderSchema>;

const usePostGender = () => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(GenderSchema),
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const handleAddNew = () => {
    setIsAddModalOpen(true);
  };

  const mutation = useCustomMutation(postGender, 'getAllGender');

  const onSubmit: SubmitHandler<FormsFields> = async (data) => {
    try {
      const convertData = convertGenderTypes(data);
      await notify(mutation.mutateAsync(convertData), {
        loading: 'Guardando género...',
        success: 'Género guardado',
        error: 'Error al guardar género',
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

export default usePostGender;

export const convertGenderTypes = (gender: any): Gender => {
  return {
    id: gender.id,
    Name: gender.Name
  };
};
