import { deleteStudiesCategory } from '@/services';
import { notify } from '@/utils/notification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface Props {
  studiesCategoryId: string;
}

const useDeleteStudiesCategory = ({ studiesCategoryId }: Props) => {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const confirmDelete = async () => {
    try {
      await notify(mutation.mutateAsync(), {
        loading: 'Eliminando categoría de estudio...',
        success: 'Categoría de estudio eliminada',
        error: 'Error al eliminar categoría de estudio',
      });
      setIsDeleteModalOpen(false);
    } catch (error: any) {
      setErrorMessage(error.message);
      setIsDeleteModalOpen(false);
    }
  };

  const mutation = useMutation({
    mutationFn: async () => await deleteStudiesCategory(studiesCategoryId),
    mutationKey: ['deleteStudiesCategory'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllStudiesCategory'] });
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
    setIsDeleteModalOpen,
    closeErrorModal,
    errorMessage,
    confirmDelete,
  };
};

export default useDeleteStudiesCategory;
