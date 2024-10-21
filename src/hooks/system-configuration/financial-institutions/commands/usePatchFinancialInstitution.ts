import { UpdateFinancialInstitutionsSchema } from '@/schemas';
import { patchFinancialInstitutions } from '@/services';
import { PatchFinancialInstitutions } from '@/types';
import { notify } from '@/utils/notification';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

type FormsFields = z.infer<typeof UpdateFinancialInstitutionsSchema>;

interface Props {
  setIsOpen: (value: boolean) => void;
  financialInstitutionId: number;
}

const usePatchFinancialInstitution = ({
  setIsOpen,
  financialInstitutionId,
}: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(UpdateFinancialInstitutionsSchema),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: PatchFinancialInstitutions) =>
      await patchFinancialInstitutions({
        financialInstitutionsId: financialInstitutionId,
        financialInstitutions: data,
      }),
    mutationKey: ['patchFinancialInstitutions'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllFinancialInstitutions'] });
    },
  });

  const onSubmit: SubmitHandler<FormsFields> = async (data) => {
    const ConvertData = convertFinancialInstitutionsTypes(data);
    try {
      await notify(mutation.mutateAsync(ConvertData), {
        loading: 'Actualizando institución financiera...',
        success: 'Institución financiera actualizada',
        error: 'Error al actualizar institución financiera',
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

export default usePatchFinancialInstitution;

export const convertFinancialInstitutionsTypes = (
  financialInstitutions: any,
): PatchFinancialInstitutions => {
  return {
    name: financialInstitutions.name,
    description: financialInstitutions.description,
    deductionPercentage: parseFloat(financialInstitutions.deductionPercentage),
  };
};