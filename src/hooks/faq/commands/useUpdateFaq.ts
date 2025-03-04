import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateFaq } from '@/services/faq/commands/actions';
import { Faq, FaqUpdate } from '@/types';
import { toast } from 'react-hot-toast';
import { UpdateFaqSchema, UpdateFaqFormData } from '@/schemas/faq/faq.schema';

interface UseUpdateFaqProps {
  faq: Faq;
}

export const useUpdateFaq = ({ faq }: UseUpdateFaqProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<UpdateFaqFormData>({
    resolver: zodResolver(UpdateFaqSchema),
    defaultValues: {
      question: faq.question,
      answer: faq.answer,
      faqCategoryId: faq.faqCategoryId,
    },
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data: FaqUpdate) => updateFaq(faq.id, data),
    onSuccess: () => {
      toast.success('FAQ actualizada exitosamente');
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
      setIsOpen(false);
    },
    onError: () => {
      toast.error('Ha ocurrido un error al actualizar la FAQ');
    },
  });

  const onSubmit = (values: UpdateFaqFormData) => {
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