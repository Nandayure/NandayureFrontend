import { updateJobPosition } from '@/services/system-configuration/employees/commands/actions';
import { notify } from '@/utils/notification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

const UpdateEmployeeJobPositionSchema = z.object({
  JobPositionId: z.number({
    required_error: 'El puesto de trabajo es requerido',
    invalid_type_error: 'El ID del puesto debe ser un número',
  }),
});

type FormFields = z.infer<typeof UpdateEmployeeJobPositionSchema>;

interface Props {
  employeeId: string;
  setIsOpen: (value: boolean) => void;
}

const useUpdateEmployeeJobPosition = ({ employeeId, setIsOpen }: Props) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: { JobPositionId: number }) =>
      await updateJobPosition(parseInt(employeeId), data.JobPositionId),
    mutationKey: ['updateEmployeeJobPosition', employeeId],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllEmployees', employeeId] });
      queryClient.invalidateQueries({ queryKey: ['getAllEmployees'] });
    },
  });

  const onSubmit = async (data: FormFields) => {
    try {
      await notify(mutation.mutateAsync(data), {
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
    onSubmit,
    mutation,
  };
};

export default useUpdateEmployeeJobPosition;