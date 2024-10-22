import { GenderSchema } from '@/schemas/system-configuration/GenderSchema';
import { postGenderProgram } from '@/services/system-configuration/gender-programs/commands/actions';
import { GenderProgram } from '@/types/system-configuration/Gender-programs/gender-programs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { notify } from '@/utils/notification';
import { z } from 'zod';
import { useCustomMutation } from '@/utils/mutations';
import usePostGenderProgram from '../../gender-programs/commands/usePostGenderProgram';

type FormsFields = z.infer<typeof GenderSchema>;

const usepostGenderProgram = () => {
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

  const mutation = useCustomMutation(postGenderProgram, 'getAllDepartments');

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

export default usePostGenderProgram;

export const convertGenderTypes = (gender: any): GenderProgram => {
  return {
    id: gender.id,
    name: gender.name
  };
};
