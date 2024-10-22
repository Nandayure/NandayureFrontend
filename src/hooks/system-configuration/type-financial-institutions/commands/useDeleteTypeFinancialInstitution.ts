import { deleteTypeFinancialInstitutions } from '@/services';
import { notify } from '@/utils/notification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface Props {
  typeFinancialInstitutionId: number;
}

const useDeleteTypeFinancialInstitution = ({
  typeFinancialInstitutionId,
}: Props) => {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const confirmDelete = async () => {
    try {
      await notify(mutation.mutateAsync(), {
        loading: 'Eliminando tipo de institución financiera...',
        success: 'Tipo de institución financiera eliminado',
        error: 'Error al eliminar tipo de institución financiera',
      });
      setIsDeleteModalOpen(false);
    } catch (error: any) {
      setErrorMessage(error.message);
      setIsDeleteModalOpen(false);
    }
  };

  const mutation = useMutation({
    mutationFn: async () =>
      await deleteTypeFinancialInstitutions(typeFinancialInstitutionId),
    mutationKey: ['deleteTypeFinancialInstitutions'],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getAllTypeFinancialInstitutions'],
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

export default useDeleteTypeFinancialInstitution;
