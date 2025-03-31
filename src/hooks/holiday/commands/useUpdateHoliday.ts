import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateHoliday } from '@/services/holiday/commands/actions';
import { Holiday, HolidayAPI } from '@/types';
import { toast } from 'react-hot-toast';
import { UpdateHolidaySchema, UpdateHolidayFormData } from '@/schemas/holiday/holiday.schema';

interface UseUpdateHolidayProps {
  holiday: Holiday;
}

export const useUpdateHoliday = ({ holiday }: UseUpdateHolidayProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<UpdateHolidayFormData>({
    resolver: zodResolver(UpdateHolidaySchema),
    defaultValues: {
      name: holiday.name,
      date: holiday.date,
      isActive: holiday.isActive,
      isRecurringYearly: holiday.isRecurringYearly,
    },
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data: HolidayAPI.Requests.Update) => updateHoliday(holiday.id, data),
    onSuccess: () => {
      toast.success('Holiday actualizado exitosamente');
      queryClient.invalidateQueries({ queryKey: ['holidays'] });
      setIsOpen(false);
    },
    onError: () => {
      toast.error('Ha ocurrido un error al actualizar el Holiday');
    },
  });

  const onSubmit = (values: UpdateHolidayFormData) => {
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