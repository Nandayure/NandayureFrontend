import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteHoliday } from '@/services/holiday/commands/actions';
import { toast } from 'react-hot-toast';
import { Holiday } from '@/types';

interface UseDeleteHolidayProps {
  holiday: Holiday;
}

export const useDeleteHoliday = ({ holiday }: UseDeleteHolidayProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: () => deleteHoliday(holiday.id),
    onSuccess: () => {
      toast.success('Holiday eliminado exitosamente');
      queryClient.invalidateQueries({ queryKey: ['holidays'] });
      setIsOpen(false);
    },
    onError: () => {
      toast.error('Ha ocurrido un error al eliminar el Holiday');
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