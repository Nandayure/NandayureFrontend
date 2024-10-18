import { deleteStudy } from '@/services';
import { notify } from '@/utils/notification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface Props {
  studyId: number;
}

const useDeleteStudy = ({ studyId }: Props) => {
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const confirmDelete = () => {
    notify(mutation.mutateAsync(), {
      loading: 'Eliminando estudio...',
      success: 'Estudio eliminado',
      error: 'Error al eliminar estudio',
    });
    setIsDeleteModalOpen(false);
  };

  const mutation = useMutation({
    mutationFn: async () => await deleteStudy(studyId),
    mutationKey: ['deleteStudy'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllStudies'] });
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

export default useDeleteStudy;
