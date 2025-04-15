import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDepartmentHead } from '@/services/system-configuration/departments/department.service';
import { UpdateDepartmentHeadRequest } from '@/types/department';
import toast from 'react-hot-toast';

export const useUpdateDepartmentHead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDepartmentHeadRequest }) =>
      updateDepartmentHead(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllDepartments'] });
      toast.success('Jefe de departamento actualizado exitosamente');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Error al actualizar el jefe de departamento');
    },
  });
};