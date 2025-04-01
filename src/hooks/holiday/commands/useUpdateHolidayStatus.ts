import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateHolidayStatus } from '@/services/holiday/commands/actions';
import { toast } from 'react-hot-toast';
import { Holiday } from '@/types';

interface UseUpdateHolidayStatusProps {
  holiday: Holiday;
}

export const useUpdateHolidayStatus = ({ holiday }: UseUpdateHolidayStatusProps) => {
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isError, error } = useMutation({
    mutationFn: (isActive: boolean) => {
      setIsPending(true);
      return updateHolidayStatus(holiday.id, isActive);
    },
    onSuccess: (_, isActive) => {
      const status = isActive ? 'activado' : 'desactivado';
      toast.success(`Holiday ${status} exitosamente`);
      queryClient.invalidateQueries({ queryKey: ['holidays'] });
      setIsPending(false);
    },
    onError: () => {
      toast.error('Ha ocurrido un error al cambiar el estado del Holiday');
      setIsPending(false);
    },
  });

  const toggleStatus = () => {
    const newStatus = !holiday.isActive;
    mutate(newStatus);
  };

  return {
    toggleStatus,
    isPending,
    isError,
    error,
  };
};