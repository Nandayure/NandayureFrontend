import { FinancialInstitutionsSchema } from '@/schemas';
import { postFinancialInstitutions } from '@/services';
import { FinancialInstitutions } from '@/types';
import { useCustomMutation } from '@/utils/mutations';
import { notify } from '@/utils/notification';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

type FormsFields = z.infer<typeof FinancialInstitutionsSchema>;

const usePostFinancialInstitution = () => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(FinancialInstitutionsSchema),
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddNew = () => {
    setIsAddModalOpen(true);
  };

  const mutation = useCustomMutation(
    postFinancialInstitutions,
    'getAllFinancialInstitutions',
  );

  const onSubmit: SubmitHandler<FormsFields> = async (data) => {
    try {
      const convertData = convertFinancialInstitutionsTypes(data);
      await notify(mutation.mutateAsync(convertData), {
        loading: 'Guardando institución financiera...',
        success: 'Institución financiera guardada',
        error: 'Error al guardar institución financiera',
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

export default usePostFinancialInstitution;

export const convertFinancialInstitutionsTypes = (
  financialInstitutions: any,
): FinancialInstitutions => {
  return {
    id: financialInstitutions.id,
    TypeFinancialInstitutionId: financialInstitutions.TypeFinancialInstitutionId,
    name: financialInstitutions.name,
    description: financialInstitutions.description,
    deductionPercentage: parseFloat(financialInstitutions.deductionPercentage),
  };
};
