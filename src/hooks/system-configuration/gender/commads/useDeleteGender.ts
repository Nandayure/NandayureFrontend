import { deleteGender } from '@/services';
import { notify } from '@/utils/notification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface Props {
  genderId: number;
}

const useDeleteGender = ({ genderId }: Props) => {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const confirmDelete = async () => {
    try {
      await notify(mutation.mutateAsync(), {
        loading: 'Eliminando género...',
        success: 'Género eliminado',
        error: 'Error al eliminar género',
      });
      setIsDeleteModalOpen(false);
    } catch (error: any) {
      setErrorMessage(error.message);
      setIsDeleteModalOpen(false);
    }
  };

  const mutation = useMutation({
    mutationFn: async () => await deleteGender(genderId),
    mutationKey: ['deleteGender'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllGender'] });
      setIsDeleteModalOpen(false);
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

export default useDeleteGender;
