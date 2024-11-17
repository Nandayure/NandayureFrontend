import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Employee } from '@/types';
import { RegisterSchema } from '@/schemas';
import { postEmployee } from '@/services';

type FormsFields = z.infer<typeof RegisterSchema>;

const usePostEmployee = () => {
  const {
    handleSubmit,
    register,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(RegisterSchema),
  });
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: Employee) => await postEmployee(data),
    onError: (error: any) => {
      console.error('Error recibido:', error);
      setError('root', {
        type: 'manual',
        message: error.message,
      });
    },
  });

  const onSubmit: SubmitHandler<FormsFields> = async (data) => {
    try {
      const convertedData = convertEmployeeTypes(data);
      const mutationPromise = mutation.mutateAsync(convertedData);
      toast.promise(mutationPromise, {
        loading: 'Guardando empleado...',
        success: 'Empleado guardado',
        error: 'Error al guardar empleado',
      });
      await mutationPromise;
      router.push('/success');
    } catch (error: any) {
      setError('root', {
        type: 'manual',
        message: error.message,
      });
    }
  };

  return {
    handleSubmit,
    onSubmit,
    register,
    mutation,
    errors,
    setValue,
  };
};

export const convertEmployeeTypes = (employee: any): Employee => {
  return {
    id: employee.id,
    Name: employee.Name,
    Surname1: employee.Surname1,
    Surname2: employee.Surname2,
    Birthdate: new Date(employee.Birthdate),
    HiringDate: new Date(employee.HiringDate),
    Email: employee.Email,
    CellPhone: employee.CellPhone,
    NumberChlidren: parseInt(employee.NumberChlidren, 10),
    JobPositionId: parseInt(employee.JobPositionId, 10),
    AvailableVacationDays: parseInt(employee.AvailableVacationDays, 10),
    MaritalStatusId: parseInt(employee.MaritalStatusId, 10),
    GenderId: parseInt(employee.GenderId, 10),
  };
};

export default usePostEmployee;
