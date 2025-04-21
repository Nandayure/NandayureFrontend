import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteFile } from '@/services';
import { FileItem } from '@/types';

interface UseDeleteFileProps {
  file: FileItem;
  folderId?: string;
  onDeleteSuccess?: () => void;
}

export const useDeleteFile = ({
  file,
  folderId,
  onDeleteSuccess,
}: UseDeleteFileProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: () => deleteFile(file.id),
    onSuccess: () => {
      toast.success('Archivo eliminado exitosamente');
      setIsOpen(false);
      queryClient.invalidateQueries({
        queryKey: ['employee-files'],
      });
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
    },
    onError: () => {
      toast.error('Ha ocurrido un error al eliminar el archivo');
    },
  });

  const onConfirmDelete = () => {
    mutate();
  };

  return {
    isOpen,
    setIsOpen,
    onConfirmDelete,
    isPending,
    isError,
    error,
  };
};
