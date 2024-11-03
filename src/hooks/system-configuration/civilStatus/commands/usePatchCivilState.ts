import { UpdateCivilStatuSchema } from '@/schemas';
import { patchCivilStatus } from '@/services';
import { PatchCivilStatus } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';


type FormsFiels = z.infer<typeof UpdateCivilStatuSchema>;
interface Props {
  setIsOpen: (value: boolean) => void;
  civilStatusId: number;
}
const usePatchCivilStatus = ({ setIsOpen, civilStatusId }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormsFiels>();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: PatchCivilStatus) =>
      await patchCivilStatus({ civilStatusId: civilStatusId, civilStatus: data }),
    mutationKey: ['patchCivilStatus'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllCivilStatus'] });
    },
  });
  const onSubmit: SubmitHandler<FormsFiels> = async (data) => {
    try {
      const ConvertData = convertCivilStatusTypes(data);
      await toast.promise(
        new Promise<string>((resolve, reject) => {
          // Especifica el tipo aquí
          setTimeout(async () => {
            try {
              await mutation.mutateAsync(ConvertData);
              resolve('Estado civil actualizado');
            } catch (error) {
              reject('Error al actualizar estado civil');
            }
          }, 500);
        }),
        {
          loading: 'Actualizando estado civil...',
          success: 'Estado civil actualizado',
          error: 'Error al actualizar estado civil',
        },
        { duration: 2500 },
      );
      setIsOpen(false);
    } catch (error: any) {
      console.error(error);
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
export default usePatchCivilStatus;

export const convertCivilStatusTypes = (civilStatus: any): PatchCivilStatus => {
  return {
    id: civilStatus.id,
    Name: civilStatus.Name,
    Description: civilStatus.Description,
  };
};

