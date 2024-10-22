import { deleteGenderProgram } from '@/services/system-configuration/gender-programs/commands/actions';
import { notify } from '@/utils/notification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface Props {
  genderProgramId: number;
}

const useDeleteGenderProgram = ({ genderProgramId }: Props) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => await deleteGenderProgram(genderProgramId),
    mutationKey: ['deleteGenderProgram'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllGendersPrograms'] });
    },
  });
  
  const confirmDelete = () => {
    notify(
      mutation.mutateAsync(),
      {
        loading: 'Eliminando género...',
        success: 'Género eliminado',
        error: 'Error al eliminar el género',
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

export default useDeleteGenderProgram;
