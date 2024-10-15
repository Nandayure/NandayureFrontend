import { UpdateDepartmentProgramSchema } from '@/schemas';
import { patchDepartmentProgram } from '@/services';
import { PatchDepartmentProgram } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
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
  } = useForm<FormsFiels>();
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
    try {
      const ConvertData = convertDepartmentProgranTypes(data);
      await toast.promise(
        new Promise<string>((resolve, reject) => {
          // Especifica el tipo aquí
          setTimeout(async () => {
            try {
              await mutation.mutateAsync(ConvertData);
              resolve('Programa departamental actualizado');
            } catch (error) {
              reject('Error al actualizar programa departamental');
            }
          }, 500);
        }),
        {
          loading: 'Actualizando programa departamental',
          success: 'Programa departamental actualizado',
          error: 'Error al actualizar programa departamental',
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

export default usePatchDepartamentProgram;

export const convertDepartmentProgranTypes = (departament: any) => {
  return {
    name: departament.name,
  };
};
