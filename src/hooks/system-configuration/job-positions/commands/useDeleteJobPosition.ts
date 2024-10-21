import { deleteJobPosition } from "@/services";
import { notify } from "@/utils/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
  jobPositionId: number;
}

const useDeleteJobPosition = ({ jobPositionId }: Props) => {
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const confirmDelete = () => {
    notify(mutation.mutateAsync(), {
      loading: 'Eliminando puesto de trabajo...',
      success: 'Puesto de trabajo eliminado',
      error: 'Error al eliminar puesto de trabajo',
    });
    setIsDeleteModalOpen(false);
  };

  const mutation = useMutation({
    mutationFn: async () => await deleteJobPosition(jobPositionId),
    mutationKey: ['deleteJobPosition'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllJobPositions'] });
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

export default useDeleteJobPosition;