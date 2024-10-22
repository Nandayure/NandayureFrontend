import { deleteGenderProgram } from '@/services/system-configuration/gender-programs/commands/actions';
import { notify } from '@/utils/notification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface Props {
  genderId: number;
}

const useDeleteGender = ({ genderId}: Props) => {
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const confirmDelete = () => {
    notify(mutation.mutateAsync(), {
      loading: 'Eliminando género...',
      success: 'Género eliminado',
      error: 'Error al eliminar género',
    });
    setIsDeleteModalOpen(false);
  };

  const mutation = useMutation({
    mutationFn: async () => await deleteGenderProgram(genderId),
    mutationKey: ['deleteGender'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllGenders'] });
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

export default useDeleteGender;
