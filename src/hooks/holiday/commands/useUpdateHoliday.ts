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

  // Asegurarse que los valores iniciales son correctos y del tipo esperado
  const form = useForm<UpdateHolidayFormData>({
    resolver: zodResolver(UpdateHolidaySchema),
    defaultValues: {
      name: holiday.name || "",
      date: holiday.specificDate || "",
      recurringDay: holiday.recurringDay || undefined,
      recurringMonth: holiday.recurringMonth || undefined,
      isActive: holiday.isActive !== undefined ? holiday.isActive : true,
      isRecurringYearly: holiday.isRecurringYearly !== undefined ? holiday.isRecurringYearly : false,
    },
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data: UpdateHolidayFormData) => {
      // Crear un objeto con los campos básicos
      const baseData: HolidayAPI.Requests.Update = {
        name: data.name,
        isActive: data.isActive,
        isRecurringYearly: data.isRecurringYearly
      };

      // Agregar campos según el tipo de feriado
      if (data.isRecurringYearly) {
        // Para feriados recurrentes
        return updateHoliday(holiday.id, {
          ...baseData,
          recurringMonth: data.recurringMonth,
          recurringDay: data.recurringDay,
          specificDate: undefined 
        });
      } else {
        // Para feriados específicos
        return updateHoliday(holiday.id, {
          ...baseData,
          specificDate: data.date, // Mapear date a specificDate
          recurringMonth: undefined, // Limpiar campos recurrentes
          recurringDay: undefined
        });
      }
    },
    onSuccess: () => {
      toast.success('Día feriado actualizado exitosamente');
      queryClient.invalidateQueries({ queryKey: ['holidays'] });
      setIsOpen(false);
    },
    onError: (err) => {
      console.error("Error al actualizar:", err);
      toast.error('Ha ocurrido un error al actualizar el día feriado');
    },
  });

  const onSubmit = (values: UpdateHolidayFormData) => {
    console.log("Valores del formulario:", values);
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