import { deleteBudgetCode } from '@/services';
import { notify } from '@/utils/notification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface Props {
  budgetCodeId: number;
}

const useDeleteBudgetCode = ({ budgetCodeId }: Props) => {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => await deleteBudgetCode(budgetCodeId),
    mutationKey: ['deleteBudgetCode'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllBudgetCodes'] });
    },
    onError: (error: any) => {
      setErrorMessage(error.message);
    },
  });

  const confirmDelete = async () => {
    try {
      await notify(mutation.mutateAsync(), {
        loading: 'Eliminando código presupuestario...',
        success: 'Código presupuestario eliminado',
        error: 'Error al eliminar código presupuestario',
      });
      setIsDeleteModalOpen(false);
    } catch (error: any) {
      setErrorMessage(error.message);
      setIsDeleteModalOpen(false);
    }
  };

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
export default useDeleteBudgetCode;
