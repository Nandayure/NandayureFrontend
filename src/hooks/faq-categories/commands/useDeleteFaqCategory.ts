import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFaqCategory } from '@/services/faq-categories/commands/actions';
import { toast } from 'react-hot-toast';
import { FaqCategory } from '@/types';

interface UseDeleteFaqCategoryProps {
  faqCategory: FaqCategory;
}

export const useDeleteFaqCategory = ({ faqCategory }: UseDeleteFaqCategoryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: () => deleteFaqCategory({ id: faqCategory.id }),
    onSuccess: () => {
      toast.success('Categoría eliminada exitosamente');
      queryClient.invalidateQueries({ queryKey: ['faqCategories'] });
      setIsOpen(false);
    },
    onError: () => {
      toast.error('Ha ocurrido un error al eliminar la categoría');
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