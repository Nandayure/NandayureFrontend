'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { z } from 'zod';

import type { Employee } from '@/types';
import { postEmployee } from '@/services';
import { PersonalInfoSchema } from '@/schemas/auth/register/personal-info.schema';
import { ContactInfoSchema } from '@/schemas/auth/register/contact-info.schema';
import { JobInfoSchema } from '@/schemas/auth/register/job-info.schema';

const EmployeeFormSchema = z.object({
  ...PersonalInfoSchema.shape,
  ...ContactInfoSchema.shape,
  ...JobInfoSchema.shape,
});

type EmployeeFormValues = z.infer<typeof EmployeeFormSchema>;

const usePostEmployee = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: Employee) => await postEmployee(data),
    onError: (error: any) => {
      console.error('Error recibido:', error);
      toast.error(error.message || 'Error al guardar empleado');
    },
  });

  const onSubmit = async (data: EmployeeFormValues) => {
    try {
      const convertedData = convertEmployeeTypes(data);
      const mutationPromise = mutation.mutateAsync(convertedData);
      toast.promise(mutationPromise, {
        loading: 'Guardando empleado...',
        success: 'Empleado guardado exitosamente',
        error: 'Error al guardar empleado',
      });
      await mutationPromise;
      router.push('/success');
    } catch (error: any) {
      toast.error(error.message || 'Error al guardar empleado');
    }
  };

  return {
    onSubmit,
    mutation,
  };
};

export const convertEmployeeTypes = (employee: any): Employee => {
  return {
    id: employee.id,
    Name: employee.Name,
    Surname1: employee.Surname1,
    Surname2: employee.Surname2,
    Birthdate: employee.Birthdate,
    HiringDate: employee.HiringDate, 
    Email: employee.Email,
    CellPhone: employee.CellPhone,
    NumberChlidren: Number(employee.NumberChlidren || 0),
    JobPositionId: Number(employee.JobPositionId),
    AvailableVacationDays: Number(employee.AvailableVacationDays || 0),
    MaritalStatusId: Number(employee.MaritalStatusId),
    GenderId: Number(employee.GenderId),
  };
};

export default usePostEmployee;
