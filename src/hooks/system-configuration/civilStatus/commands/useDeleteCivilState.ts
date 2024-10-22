import { deleteCivilStatus } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
    civilStatusId: number;
}

const useDeleteCivilStatus = ({ civilStatusId}: Props) => {
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const confirmDelete = () => {
    toast.loading('Eliminando estado civil..', { duration: 500 });
    mutation.mutate();
    setIsDeleteModalOpen(false);
  };
  const mutation = useMutation({
    mutationFn: async () => await deleteCivilStatus(civilStatusId),
    mutationKey: ['deleteCivilStatus'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllCivilStatus'] });
      toast.success('Estado civil eliminado', { duration: 2500 });
      setIsDeleteModalOpen(false);
    },
    onError: () => {
      toast.error('Error al eliminar el estado civil', { duration: 2500 });
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
export default useDeleteCivilStatus;

