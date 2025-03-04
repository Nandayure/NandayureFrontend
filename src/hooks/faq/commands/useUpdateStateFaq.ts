import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateFaqStatus } from '@/services/faq/commands/actions';
import { toast } from 'react-hot-toast';
import { Faq } from '@/types';

interface UseUpdateFaqStatusProps {
  faq: Faq;
}

export const useUpdateFaqStatus = ({ faq }: UseUpdateFaqStatusProps) => {
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isError, error } = useMutation({
    mutationFn: (status: string) => {
      setIsPending(true);
      return updateFaqStatus(faq.id, status);
    },
    onSuccess: (_, status) => {
      const newStatus = status === 'active' ? 'activada' : 'desactivada';
      toast.success(`FAQ ${newStatus} exitosamente`);
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
      setIsPending(false);
    },
    onError: () => {
      toast.error('Ha ocurrido un error al cambiar el estado de la FAQ');
      setIsPending(false);
    },
  });

  const toggleStatus = () => {
    const newStatus = faq.status === 'active' ? 'inactive' : 'active';
    mutate(newStatus);
  };

  return {
    toggleStatus,
    isPending,
    isError,
    error,
  };
};
