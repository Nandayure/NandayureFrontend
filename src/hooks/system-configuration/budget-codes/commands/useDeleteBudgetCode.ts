import { deleteBudgetCode } from '@/services';
import { notify } from '@/utils/notification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface Props {
  budgetCodeId: number;
}

const useDeleteBudgetCode = ({ budgetCodeId }: Props) => {
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const confirmDelete = () => {
    notify(mutation.mutateAsync(), {
      loading: 'Elimanando código presupuestario...',
      success: 'Código presupuestario eliminado',
      error: 'Error al eliminar código presupuestario',
    });
    setIsDeleteModalOpen(false);
  };

  const mutation = useMutation({
    mutationFn: async () => await deleteBudgetCode(budgetCodeId),
    mutationKey: ['deleteBudgetCode'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllBudgetCodes'] });
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
export default useDeleteBudgetCode;
