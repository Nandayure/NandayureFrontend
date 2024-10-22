import { deleteFinancialInstitutions } from '@/services';
import { notify } from '@/utils/notification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface Props {
  financialInstitutionId: number;
}

const useDeleteFinancialInstitution = ({ financialInstitutionId }: Props) => {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const confirmDelete = async () => {
    try {
      await notify(mutation.mutateAsync(), {
        loading: 'Eliminando institución financiera...',
        success: 'Institución financiera eliminada',
        error: 'Error al eliminar institución financiera',
      });
      setIsDeleteModalOpen(false);
    } catch (error: any) {
      setErrorMessage(error.message);
      setIsDeleteModalOpen(false);
    }
  };

  const mutation = useMutation({
    mutationFn: async () =>
      await deleteFinancialInstitutions(financialInstitutionId),
    mutationKey: ['deleteFinancialInstitutions'],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getAllFinancialInstitutions'],
      });
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
    setIsDeleteModalOpen,
    closeErrorModal,
    errorMessage,
    setErrorMessage,
    confirmDelete,
  };
};

export default useDeleteFinancialInstitution;
