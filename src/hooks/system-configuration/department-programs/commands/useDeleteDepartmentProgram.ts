import { deleteDepartment, deleteDepartmentProgram } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { set } from 'react-hook-form';
import toast from 'react-hot-toast';

interface Props {
  departmentProgramId: number;
}

const useDeleteDepartmentProgram = ({ departmentProgramId }: Props) => {
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const confirmDelete = () => {
    toast.loading('Eliminando programa departamental', { duration: 500 });
    mutation.mutate();
    setIsDeleteModalOpen(false);
  };

  const mutation = useMutation({
    mutationFn: async () => await deleteDepartmentProgram(departmentProgramId),
    mutationKey: ['deleteDepartmentProgram'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllDepartmentPrograms'] });
      toast.success('Programa departamental eliminado', { duration: 2500 });
      setIsDeleteModalOpen(false);
    },
    onError: () => {
      toast.error('Error al eliminar programa departamental', { duration: 2500 });
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

export default useDeleteDepartmentProgram;
