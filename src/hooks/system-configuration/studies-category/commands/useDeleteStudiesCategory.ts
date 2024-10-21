import { deleteStudiesCategory } from "@/services";
import { notify } from "@/utils/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
  studiesCategoryId: string;
}

const useDeleteStudiesCategory = ({ studiesCategoryId }: Props) => {
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const confirmDelete = () => {
    notify(mutation.mutateAsync(), {
      loading: 'Eliminando categoría de estudio...',
      success: 'Categoría de estudio eliminada',
      error: 'Error al eliminar categoría de estudio',
    });
    setIsDeleteModalOpen(false);
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

  return {
    handleDelete,
    mutation,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    confirmDelete,
  };
};

export default useDeleteStudiesCategory;