import { patchGender } from '@/services';
import { PatchGender } from '@/types/system-configuration/Gender/gender';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UpdateGenderSchema } from '@/schemas/system-configuration/GenderSchema';
import { notify, showError } from '@/utils/notification';
import { z } from 'zod';
import { Import } from 'lucide-react';

type FormsFields = z.infer<typeof UpdateGenderSchema>;
interface Props {
  setIsOpen: (value: boolean) => void;
  genderId: number;
}

const usePatchGender = ({ setIsOpen, genderId }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(UpdateGenderSchema),
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: PatchGender) =>
      await patchGender({ GenderId: genderId, Gender: data }),
    mutationKey: ['patchGender'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllGender'] });
    },
  });

  const onSubmit: SubmitHandler<FormsFields> = async (data) => {
    const ConvertData = convertGenderTypes(data);
    try {
      await notify(mutation.mutateAsync(ConvertData), {
        loading: 'Actualizando género...',
        success: 'Género actualizado',
        error: 'Error al actualizar género',
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

export default usePatchGender;

export const convertGenderTypes = (gender: any): PatchGender => {
  return {
    id: gender.id,
    Name: gender.Name,
  };
};
