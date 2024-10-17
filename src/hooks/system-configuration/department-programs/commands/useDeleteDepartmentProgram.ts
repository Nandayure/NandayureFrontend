import { deleteDepartmentProgram } from '@/services';
import { notify } from '@/utils/notification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface Props {
  departmentProgramId: number;
}

const useDeleteDepartmentProgram = ({ departmentProgramId }: Props) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => await deleteDepartmentProgram(departmentProgramId),
    mutationKey: ['deleteDepartmentProgram'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllDepartmentPrograms'] });
    },
  });
  
  const confirmDelete = () => {
    notify(
      mutation.mutateAsync(),
      {
        loading: 'Eliminando programa departamental...',
        success: 'Programa departamental eliminado',
        error: 'Error al eliminar programa departamental',
      }
    );
    setIsDeleteModalOpen(false);
  };

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

export default useDeleteDepartmentProgram;
