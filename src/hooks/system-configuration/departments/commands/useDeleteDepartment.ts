import { deleteDepartment } from '@/services';
import { notify } from '@/utils/notification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface Props {
  departmentId: number;
}

export default function useDeleteDepartment({ departmentId }: Props) {
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async () => await deleteDepartment(departmentId),
    mutationKey: ['deleteDepartment'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllDepartments'] });
    },
    onError: (error: Error) => {
      setErrorMessage(error.message || 'Ha ocurrido un error al eliminar el departamento');
    },
  });

  const confirmDelete = async () => {
    try {
      await notify(mutation.mutateAsync(), {
        loading: 'Eliminando departamento...',
        success: 'Departamento eliminado',
        error: 'Error al eliminar departamento',
      });
      setIsDeleteModalOpen(false);
    } catch (error) {
      // El error ya se maneja en onError de la mutación
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
    confirmDelete,
    errorMessage,
    closeErrorModal,
  };
}