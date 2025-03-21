import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateFaqCategory } from '@/services/faq-categories/commands/actions';
import { FaqCategory, FaqCategoryUpdate } from '@/types';
import { toast } from 'react-hot-toast';
import { UpdateFaqCategorySchema } from '@/schemas';

interface UseUpdateFaqCategoryProps {
  faqCategory: FaqCategory;
}

export const useUpdateFaqCategory = ({ faqCategory }: UseUpdateFaqCategoryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<{ name: string }>({
    resolver: zodResolver(UpdateFaqCategorySchema),
    defaultValues: {
      name: faqCategory.name,
    },
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data: FaqCategoryUpdate) => updateFaqCategory({ id: faqCategory.id }, data),
    onSuccess: () => {
      toast.success('Categoría actualizada exitosamente');
      // Invalidar la query para refrescar los datos
      queryClient.invalidateQueries({ queryKey: ['faqCategories'] });
      setIsOpen(false);
    },
    onError: () => {
      toast.error('Ha ocurrido un error al actualizar la categoría');
    },
  });

  const onSubmit = (values: FaqCategoryUpdate) => {
    mutate(values);
  };

  return {
    form,
    isOpen,
    setIsOpen,
    onSubmit,
    isPending,
    isError,
    error,
  };
};