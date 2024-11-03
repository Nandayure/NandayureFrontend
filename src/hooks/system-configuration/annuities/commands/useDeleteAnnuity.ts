import { deleteAnnuity } from '@/services';
import { notify, showError } from '@/utils/notification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface Props {
  annuityId: number;
}

const useDeleteAnnuity = ({ annuityId }: Props) => {
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const confirmDelete = async () => {
    await notify(mutation.mutateAsync(), {
      loading: 'Eliminando anualidad...',
      success: 'Anualidad eliminada',
      error: 'Error al eliminar anualidad',
    });
    setIsDeleteModalOpen(false);
  };

  const mutation = useMutation({
    mutationFn: async () => await deleteAnnuity(annuityId), 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllAnnuities'] });
    },
    onError: () => {
      showError('Error al eliminar anualidad');
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

export default useDeleteAnnuity;
