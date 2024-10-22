import { GenderProgramSchema } from '@/schemas/system-configuration/GenderProgramSchema';
import { postGenderProgram } from '@/services/system-configuration/gender-programs/commands/actions';
import { GenderProgram } from '@/types/system-configuration/Gender-programs/gender-programs';
import { useCustomMutation } from '@/utils/mutations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { notify } from '@/utils/notification'; 
import { z } from 'zod';

type FormsFields = z.infer<typeof GenderProgramSchema>;

const usePostGenderProgram = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(GenderProgramSchema),
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const handleAddNew = () => {
    setIsAddModalOpen(true);
  };

  const mutation = useCustomMutation(
    postGenderProgram,
    'getAllGenderPrograms',
  );

  const onSubmit: SubmitHandler<FormsFields> = async (data) => {
    try {
      const convertData = convertGenderProgramTypes(data);
      await notify(mutation.mutateAsync(convertData), {
        loading: 'Guardando género...',
        success: 'Género guardado',
        error: 'Error al guardar el género',
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

export default usePostGenderProgram;

export const convertGenderProgramTypes = (
  gender: any,
): GenderProgram => {
  return {
    id: gender.id,
    name: gender.name,
  };
};
