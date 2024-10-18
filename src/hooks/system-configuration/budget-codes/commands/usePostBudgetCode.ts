import { BudgetCodeSchema } from '@/schemas';
import { postBudgetCode } from '@/services';
import { BudgetCode } from '@/types';
import { useCustomMutation } from '@/utils/mutations';
import { notify } from '@/utils/notification';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

type FormsFields = z.infer<typeof BudgetCodeSchema>;

const usePostBudgetCode = () => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(BudgetCodeSchema),
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddNew = () => {
    setIsAddModalOpen(true);
  };

  const mutation = useCustomMutation(postBudgetCode, 'getAllBudgetCodes');

  const onSubmit: SubmitHandler<FormsFields> = async (data) => {
    try {
      const convertData = convertBudgetCodeTypes(data);
      await notify(mutation.mutateAsync(convertData), {
        loading: 'Guardando código presupuestario...',
        success: 'Código presupuestario guardado',
        error: 'Error al guardar código presupuestario',
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

export default usePostBudgetCode;

export const convertBudgetCodeTypes = (budgetCode: any): BudgetCode => {
  return {
    id: budgetCode.id,
    CodSalary: budgetCode.CodSalary,
    CodExtra: budgetCode.CodExtra,
    CodAnuity: budgetCode.CodAnuity,
    CodSalaryPlus: budgetCode.CodSalaryPlus,
  };
};
