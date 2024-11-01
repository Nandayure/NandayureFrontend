import { deleteCivilStatus } from '@/services';
import { notify } from '@/utils/notification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { error } from 'console';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  civilStatusId: number;
}

const useDeleteCivilStatus = ({ civilStatusId }: Props) => {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const confirmDelete = async () => {
    try {
      await notify(mutation.mutateAsync(), {
        loading: 'Eliminando estado civil...',
        success: 'Estado civil eliminado',
        error: 'Error al eliminar el estado civil',
      });
      setIsDeleteModalOpen(false);
    } catch (error: any) {
      setIsDeleteModalOpen(false);
      setErrorMessage(error.message);
    }
  };
  const mutation = useMutation({
    mutationFn: async () => await deleteCivilStatus(civilStatusId),
    mutationKey: ['deleteCivilStatus'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllCivilStatus'] });
      toast.success('Estado civil eliminado', { duration: 2500 });
      setIsDeleteModalOpen(false);
    },
    onError: (error: Error) => {
      setErrorMessage(error.message);
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
export default useDeleteCivilStatus;
