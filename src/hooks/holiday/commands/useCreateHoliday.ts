import { useState, useEffect } from 'react';
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
      recurringMonth: undefined,
      recurringDay: undefined,
    },
    mode: 'onChange',
  });

  const isRecurringYearly = form.watch('isRecurringYearly');

  useEffect(() => {
    if (isRecurringYearly) {
      form.setValue('date', undefined);
    } else {
      form.setValue('recurringMonth', undefined);
      form.setValue('recurringDay', undefined);
    }
  }, [isRecurringYearly, form]);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data: HolidayFormData) => {
      // Base holiday data
      const baseHolidayData = {
        name: data.name,
        isActive: data.isActive ?? true,
        isRecurringYearly: data.isRecurringYearly ?? false,
      };

      // Add fields based on holiday type
      const holidayData = data.isRecurringYearly
        ? {
          ...baseHolidayData,
          ...(data.recurringMonth && { recurringMonth: data.recurringMonth }),
          ...(data.recurringDay && { recurringDay: data.recurringDay }),
        }
        : {
          ...baseHolidayData,
          ...(data.date && { specificDate: data.date }),
        };

      return createHoliday(holidayData);
    },
    onSuccess: () => {
      toast.success('Holiday creado exitosamente');
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