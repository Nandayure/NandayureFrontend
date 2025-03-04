import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFaq } from '@/services/faq/commands/actions';
import { toast } from 'react-hot-toast';
import { Faq } from '@/types';

interface UseDeleteFaqProps {
  faq: Faq;
}

export const useDeleteFaq = ({ faq }: UseDeleteFaqProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: () => deleteFaq(faq.id),
    onSuccess: () => {
      toast.success('FAQ eliminada exitosamente');
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
      setIsOpen(false);
    },
    onError: () => {
      toast.error('Ha ocurrido un error al eliminar la FAQ');
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