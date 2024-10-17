import { deleteDepartment } from '@/services';
import { notify, showError } from '@/utils/notification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface Props {
  departmentId: number;
}

const useDeleteDepartment = ({ departmentId }: Props) => {
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const confirmDelete = () => {
    notify(mutation.mutateAsync(), {
      loading: 'Eliminando departamento...',
      success: 'Departamento eliminado',
      error: 'Error al eliminar departamento',
    });
    setIsDeleteModalOpen(false);
  };

  const mutation = useMutation({
    mutationFn: async () => await deleteDepartment(departmentId),
    mutationKey: ['deleteDepartment'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllDepartments'] });
    },
  });

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  return {
    handleDelete,
    mutation,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    confirmDelete,
  };
};

export default useDeleteDepartment;
