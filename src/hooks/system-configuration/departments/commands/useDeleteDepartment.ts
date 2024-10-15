import { deleteDepartment } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { set } from 'react-hook-form';
import toast from 'react-hot-toast';

interface Props {
  departmentId: number;
}

const useDeleteDepartment = ({ departmentId }: Props) => {
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const confirmDelete = () => {
    toast.loading('Eliminando departamento...', { duration: 500 });
    mutation.mutate();
    setIsDeleteModalOpen(false);
  };

  const mutation = useMutation({
    mutationFn: async () => await deleteDepartment(departmentId),
    mutationKey: ['deleteDepartment'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllDepartments'] });
      toast.success('Departamento eliminado', { duration: 2500 });
      setIsDeleteModalOpen(false);
    },
    onError: () => {
      toast.error('Error al eliminar departamento', { duration: 2500 });
    },
  });

  const handleDelete = (id: number) => {
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

export default useDeleteDepartment;
