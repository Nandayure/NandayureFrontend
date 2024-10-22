import { UpdateGenderProgramSchema } from '@/schemas/system-configuration/GenderProgramSchema';
import { PatchGenderProgram } from '@/types/system-configuration/Gender-programs/gender-programs';
import { patchGenderProgram } from '@/services/system-configuration/gender-programs/commands/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { notify, showError } from '@/utils/notification'; 
import { z } from 'zod';

type FormsFiels = z.infer<typeof UpdateGenderProgramSchema>;
interface Props {
  setIsOpen: (value: boolean) => void;
  genderProgramId: number;
}

const usePatchGenderProgram = ({
  setIsOpen,
  genderProgramId,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormsFiels>({
    resolver: zodResolver(UpdateGenderProgramSchema),
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: PatchGenderProgram) =>
      await patchGenderProgram({
        genderProgramId: genderProgramId,
        gender: data,
      }),
    mutationKey: ['PatchGenderProgram'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllGenderPrograms'] });
    },
  });

  const onSubmit: SubmitHandler<FormsFiels> = async (data) => {
    const ConvertData = convertGenderProgranTypes(data);
    try {
      await notify(
        mutation.mutateAsync(ConvertData),
        {
          loading: 'Actualizando género...',
          success: 'Género actualizado',
          error: 'Error al actualizar el género',
        }
      );
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
    mutation,
  };
};

export default usePatchGenderProgram;

export const convertGenderProgranTypes = (gender: any): PatchGenderProgram => {
  return {
    name: gender.name,
  };
};
