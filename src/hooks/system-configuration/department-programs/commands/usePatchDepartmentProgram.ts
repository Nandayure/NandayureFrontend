import { UpdateDepartmentProgramSchema } from '@/schemas';
import { patchDepartmentProgram } from '@/services';
import { PatchDepartmentProgram } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { notify, showError } from '@/utils/notification'; 
import { z } from 'zod';

type FormsFiels = z.infer<typeof UpdateDepartmentProgramSchema>;
interface Props {
  setIsOpen: (value: boolean) => void;
  departmentProgramId: number;
}

const usePatchDepartamentProgram = ({
  setIsOpen,
  departmentProgramId,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormsFiels>({
    resolver: zodResolver(UpdateDepartmentProgramSchema),
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: PatchDepartmentProgram) =>
      await patchDepartmentProgram({
        departmentProgramId: departmentProgramId,
        department: data,
      }),
    mutationKey: ['patchDepartmentProgram'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllDepartmentPrograms'] });
    },
  });

  const onSubmit: SubmitHandler<FormsFiels> = async (data) => {
    const ConvertData = convertDepartmentProgranTypes(data);
    try {
      await notify(
        mutation.mutateAsync(ConvertData),
        {
          loading: 'Actualizando programa departamental...',
          success: 'Programa departamental actualizado',
          error: 'Error al actualizar programa departamental',
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

export default usePatchDepartamentProgram;

export const convertDepartmentProgranTypes = (departament: any): PatchDepartmentProgram => {
  return {
    name: departament.name,
  };
};
