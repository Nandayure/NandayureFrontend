import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFaqCategory } from '@/services/faq-categories/commands/actions';
import { toast } from 'react-hot-toast';
import { CreateFaqCategorySchema, FaqCategoryFormData } from '@/schemas';

export const useCreateFaqCategory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<FaqCategoryFormData>({
    resolver: zodResolver(CreateFaqCategorySchema),
    defaultValues: {
      name: '',
    },
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createFaqCategory,
    onSuccess: () => {
      toast.success('Categoría creada exitosamente');
      // Invalidar la query para refrescar los datos
      queryClient.invalidateQueries({ queryKey: ['faqCategories'] });
      form.reset();
      setIsOpen(false);
    },
    onError: () => {
      toast.error('Ha ocurrido un error al crear la categoría');
    },
  });

  const onSubmit = (values: FaqCategoryFormData) => {
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
