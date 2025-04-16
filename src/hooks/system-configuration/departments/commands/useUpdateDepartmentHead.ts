import { updateDepartmentHead } from '@/services';
import { notify } from '@/utils/notification';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  departmentId: number;
}

const useUpdateDepartmentHead = ({ departmentId }: Props) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (departmentHeadId: string) =>
      await updateDepartmentHead(departmentId, departmentHeadId),
    mutationKey: ['updateDepartmentHead', departmentId],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllDepartments'] });
    },
  });

  const updateHead = async (departmentHeadId: string) => {
    try {
      await notify(mutation.mutateAsync(departmentHeadId), {
        loading: 'Actualizando jefe de departamento...',
        success: 'Jefe de departamento actualizado exitosamente',
        error: 'Error al actualizar el jefe de departamento',
      });
    } catch (error: any) {
      console.error('Error al actualizar jefe:', error.message);
    }
  };

  return {
    updateHead,
    isLoading: mutation.isPending
  };
};

export default useUpdateDepartmentHead;