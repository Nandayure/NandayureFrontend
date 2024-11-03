
import { patchAnnuity } from '@/services';
import { PatchAnnuity } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UpdateAnnuitySchema } from '@/schemas';
import { notify, showError } from '@/utils/notification';
import { z } from 'zod';

type FormsFields = z.infer<typeof UpdateAnnuitySchema>;

interface Props {
  setIsOpen: (value: boolean) => void;
  annuityId: number;
}

const usePatchAnnuity = ({ setIsOpen, annuityId }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(UpdateAnnuitySchema),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: PatchAnnuity) =>
      await patchAnnuity({ annuityId, annuity: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllAnnuities'] });
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        alert('Sesión expirada. Redirigiendo al login.');
        window.location.href = '/login';
      } else {
        showError('Error al actualizar anualidad');
      }
    },
  });

  const onSubmit: SubmitHandler<FormsFields> = async (data) => {
    const formattedData: PatchAnnuity = {
      Date: data.Date,
      Description: data.Description,
      Amount: data.Amount,
      EmployeeId: Number(data.EmployeeId),
    };

    try {
      await notify(mutation.mutateAsync(formattedData), {
        loading: 'Actualizando anualidad...',
        success: 'Anualidad actualizada',
        error: 'Error al actualizar anualidad',
      });
      setIsOpen(false);
    } catch (error: any) {
      showError('Error al actualizar anualidad');
      setIsOpen(false);
    }
  };

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    mutation,
  };
};

export default usePatchAnnuity;
