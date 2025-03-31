import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createHoliday } from '@/services/holiday/commands/actions';
import { toast } from 'react-hot-toast';
import { CreateHolidaySchema, HolidayFormData } from '@/schemas/holiday/holiday.schema';

export const useCreateHoliday = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<HolidayFormData>({
    resolver: zodResolver(CreateHolidaySchema),
    defaultValues: {
      name: '',
      date: '',
      isActive: true,
      isRecurringYearly: false,
    },
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data: HolidayFormData) => {
      return createHoliday({
        ...data,
        isActive: data.isActive ?? true, // Ensure isActive has a default
      });
    },
    onSuccess: () => {
      toast.success('Holiday creado exitosamente');
      // Invalidar la query para refrescar los datos
      queryClient.invalidateQueries({ queryKey: ['holidays'] });
      form.reset();
      setIsOpen(false);
    },
    onError: () => {
      toast.error('Ha ocurrido un error al crear el Holiday');
    },
  });

  const onSubmit = (values: HolidayFormData) => {
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