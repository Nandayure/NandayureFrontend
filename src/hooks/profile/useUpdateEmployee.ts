import { UpdateEmployeeSchema } from '@/schemas';
import { updateEmployee } from '@/services';
import { UpdateEmployee } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

interface Props {
  employeeId: number | undefined;
  setIsOpen: (value: boolean) => void;
}

type FormsFiels = z.infer<typeof UpdateEmployeeSchema>;

const useUpdateEmployee = ({ employeeId, setIsOpen }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
  } = useForm<FormsFiels>({
    resolver: zodResolver(UpdateEmployeeSchema),
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: UpdateEmployee) =>
      await updateEmployee({ employeeId: employeeId!, employee: data }),
    mutationKey: ['updateEmployee', employeeId],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employeeById', employeeId] });
    },
  });

  const onSubmit: SubmitHandler<FormsFiels> = async (data) => {
    try {
      await toast.promise(
        new Promise((resolve, reject) => {
          setTimeout(async () => {
            try {
              await mutation.mutateAsync(data);
              resolve('Empleado actualizado');
            } catch (error) {
              reject('Error al actualizar empleado');
            }
          }, 500); // artificial waiting
        }),
        {
          loading: 'Actualizando empleado...',
          success: 'Empleado actualizado',
          error: 'Error al actualizar empleado',
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
    handleSubmit,
    mutation,
    trigger,
    onSubmit,
    register,
    errors,
  };
};

export default useUpdateEmployee;
