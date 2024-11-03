import { deleteDepartmentProgram } from '@/services';
import { notify } from '@/utils/notification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface Props {
  departmentProgramId: number;
}

const useDeleteDepartmentProgram = ({ departmentProgramId }: Props) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => await deleteDepartmentProgram(departmentProgramId),
    mutationKey: ['deleteDepartmentProgram'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllDepartmentPrograms'] });
    },
    onError: (error: any) => {
      setErrorMessage(error.message);
    },
  });

  const confirmDelete = async () => {
    try {
     await notify(mutation.mutateAsync(), {
        loading: 'Eliminando programa departamental...',
        success: 'Programa departamental eliminado',
        error: 'Error al eliminar programa departamental',
      });
      setIsDeleteModalOpen(false);
    } catch (error: any) {
      setErrorMessage(error.message);
      setIsDeleteModalOpen(false);
    }
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const closeErrorModal = () => {
    setErrorMessage(null);
  };

  return {
    handleDelete,
    mutation,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    closeErrorModal,
    errorMessage,
    setErrorMessage,
    confirmDelete,
  };
};

export default useDeleteDepartmentProgram;
