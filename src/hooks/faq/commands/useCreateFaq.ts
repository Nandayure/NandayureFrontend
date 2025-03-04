import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFaq } from '@/services/faq/commands/actions';
import { toast } from 'react-hot-toast';
import { CreateFaqSchema, FaqFormData } from '@/schemas/faq/faq.schema';

export const useCreateFaq = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<FaqFormData>({
    resolver: zodResolver(CreateFaqSchema),
    defaultValues: {
      question: '',
      answer: '',
      faqCategoryId: undefined as unknown as number,
    },
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data: FaqFormData) => {
      return createFaq({
        ...data,
        status: 'inactive' 
      });
    },
    onSuccess: () => {
      toast.success('FAQ creada exitosamente');
      // Invalidar la query para refrescar los datos
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
      form.reset();
      setIsOpen(false);
    },
    onError: () => {
      toast.error('Ha ocurrido un error al crear la FAQ');
    },
  });

  const onSubmit = (values: FaqFormData) => {
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