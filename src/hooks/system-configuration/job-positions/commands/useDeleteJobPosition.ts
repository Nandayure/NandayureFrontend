import { deleteJobPosition } from '@/services';
import { notify } from '@/utils/notification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface Props {
  jobPositionId: number;
}

const useDeleteJobPosition = ({ jobPositionId }: Props) => {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const confirmDelete = async () => {
    try {
      await notify(mutation.mutateAsync(), {
        loading: 'Eliminando puesto de trabajo...',
        success: 'Puesto de trabajo eliminado',
        error: 'Error al eliminar puesto de trabajo',
      });
      setIsDeleteModalOpen(false);
    } catch (error: any) {
      setErrorMessage(error.message);
      setIsDeleteModalOpen(false);
    }
  };

  const mutation = useMutation({
    mutationFn: async () => await deleteJobPosition(jobPositionId),
    mutationKey: ['deleteJobPosition'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllJobPositions'] });
    },
    onError: (error: any) => {
      setErrorMessage(error.message);
      setIsDeleteModalOpen(false);
    },
  });

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
    errorMessage,
    closeErrorModal,
    setErrorMessage,
    setIsDeleteModalOpen,
    confirmDelete,
  };
};

export default useDeleteJobPosition;
