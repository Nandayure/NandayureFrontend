import { deleteTypeFinancialInstitutions } from "@/services";
import { notify } from "@/utils/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
  typeFinancialInstitutionId: number;
}

const useDeleteTypeFinancialInstitution = ({
  typeFinancialInstitutionId,
}: Props) => {
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const confirmDelete = () => {
    notify(mutation.mutateAsync(), {
      loading: 'Eliminando tipo de institución financiera...',
      success: 'Tipo de institución financiera eliminado',
      error: 'Error al eliminar tipo de institución financiera',
    });
    setIsDeleteModalOpen(false);
  };

  const mutation = useMutation({
    mutationFn: async () => await deleteTypeFinancialInstitutions(typeFinancialInstitutionId),
    mutationKey: ['deleteTypeFinancialInstitutions'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllTypeFinancialInstitutions'] });
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

export default useDeleteTypeFinancialInstitution;