import { UpdateJobPositionSchema } from '@/schemas';
import { patchJobPosition } from '@/services';
import { PatchJobPosition } from '@/types';
import { notify } from '@/utils/notification';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

type FormsFields = z.infer<typeof UpdateJobPositionSchema>;

interface Props {
  setIsOpen: (value: boolean) => void;
  jobPositionId: number;
}

const usePatchJobPosition = ({ setIsOpen, jobPositionId }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(UpdateJobPositionSchema),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: PatchJobPosition) =>
      await patchJobPosition({
        jobPositionId: jobPositionId,
        jobPosition: data,
      }),
    mutationKey: ['patchJobPosition'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllJobPositions'] });
    },
  });

  const onSubmit: SubmitHandler<FormsFields> = async (data) => {
    const ConvertData = convertJobPositionTypes(data);
    try {
      await notify(mutation.mutateAsync(ConvertData), {
        loading: 'Actualizando puesto de trabajo...',
        success: 'Puesto de trabajo actualizado',
        error: 'Error al actualizar puesto de trabajo',
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

export default usePatchJobPosition;

export const convertJobPositionTypes = (jobPosition: any): PatchJobPosition => {
  return {
    Name: jobPosition.Name,
    Description: jobPosition.Description,
    DepartmentId: jobPosition.DepartmentId,
  };
};
