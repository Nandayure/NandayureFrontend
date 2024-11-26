import { UpdateBudgetCodeSchema } from '@/schemas';
import { patchBudgetCode } from '@/services';
import { PatchBudgetCode } from '@/types';
import { notify } from '@/utils/notification';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

type FormsFields = z.infer<typeof UpdateBudgetCodeSchema>;
interface Props {
  setIsOpen: (value: boolean) => void;
  budgetCodeId: number;
}

const usePatchBudgetCode = ({ setIsOpen, budgetCodeId }: Props) => {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(UpdateBudgetCodeSchema),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: PatchBudgetCode) =>
      await patchBudgetCode({ budgetCodeId: budgetCodeId, budgetCode: data }),
    mutationKey: ['patchBudgetCode'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllBudgetCodes'] });
    },
  });

  const onSubmit: SubmitHandler<FormsFields> = async (data) => {
    const ConvertData = convertBudgetCodeTypes(data);
    try {
      await notify(mutation.mutateAsync(ConvertData), {
        loading: 'Actualizando código presupuestario...',
        success: 'Código presupuestario actualizado',
        error: 'Error al actualizar código presupuestario',
      });
      setIsOpen(false);
    } catch (error: any) {
      setIsOpen(false);
    }
  };

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    setValue,
    mutation,
  };
};

export default usePatchBudgetCode;

export const convertBudgetCodeTypes = (budgetCode: any): PatchBudgetCode => {
  return {
    CodSalary: budgetCode.CodSalary,
    CodExtra: budgetCode.CodExtra,
    CodAnuity: budgetCode.CodAnuity,
    CodSalaryPlus: budgetCode.CodSalaryPlus,
  };
};
