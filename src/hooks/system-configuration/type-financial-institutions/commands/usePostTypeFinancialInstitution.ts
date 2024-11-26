import { TypeFinancialInstitutionsSchema } from '@/schemas';
import { postTypeFinancialInstitutions } from '@/services';
import { TypeFinancialInstitutions } from '@/types';
import { useCustomMutation } from '@/utils/mutations';
import { notify } from '@/utils/notification';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

type FormsFields = z.infer<typeof TypeFinancialInstitutionsSchema>;

const usePostTypeFinancialInstitution = () => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(TypeFinancialInstitutionsSchema),
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddNew = () => {
    setIsAddModalOpen(true);
  };

  const mutation = useCustomMutation(
    postTypeFinancialInstitutions,
    'getAllTypeFinancialInstitutions',
  );

  const onSubmit: SubmitHandler<FormsFields> = async (data) => {
    try {
      const convertData = convertTypeFinancialInstitutionsTypes(data);
      await notify(mutation.mutateAsync(convertData), {
        loading: 'Guardando tipo de institución financiera...',
        success: 'Tipo de institución financiera guardado',
        error: 'Error al guardar tipo de institución financiera',
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

export default usePostTypeFinancialInstitution;

export const convertTypeFinancialInstitutionsTypes = (
  typeFinancialInstitutions: any,
): TypeFinancialInstitutions => {
  return {
    id: typeFinancialInstitutions.id,
    name: typeFinancialInstitutions.name,
  };
};
