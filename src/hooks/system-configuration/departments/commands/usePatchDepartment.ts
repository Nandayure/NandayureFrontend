import { UpdateDepartmentSchema } from '@/schemas';
import { patchDepartment } from '@/services';
import { PatchDepartment } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

type FormsFiels = z.infer<typeof UpdateDepartmentSchema>;
interface Props {
  setIsOpen: (value: boolean) => void;
}

const usePatchDepartament = ({ setIsOpen }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormsFiels>();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: PatchDepartment) =>
      await patchDepartment({ departmentId: data.id!, department: data }),
    mutationKey: ['patchDepartment'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllDepartments'] });
    },
  });

  const onSubmit: SubmitHandler<FormsFiels> = async (data) => {
    try {
      await toast.promise(
        new Promise<string>((resolve, reject) => { // Especifica el tipo aquí
          setTimeout(async () => {
            try {
              await mutation.mutateAsync(data);
              resolve('Departamento actualizado');
            } catch (error) {
              reject('Error al actualizar departamento');
            }
          }, 500); 
        }),
        {
          loading: 'Actualizando departamento...',
          success: 'Departamento actualizado',
          error: 'Error al actualizar departamento',
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

export default usePatchDepartament;
