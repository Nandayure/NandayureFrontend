import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { RequestVacation } from '@/types';
import { postVacation } from '@/services';
import { useRouter } from 'next/navigation';

const usePostVacation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<RequestVacation>();
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: RequestVacation) => await postVacation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getCurrentToApprove'],
      });
    },
    onError: (error: any) => {
      setError('root', {
        type: 'manual',
        message: error.message,
      });
    },
  });

  const onSubmit = handleSubmit(async (data: RequestVacation) => {
    try {
      await toast.promise(
        mutation.mutateAsync(data),
        {
          loading: 'Enviando solicitud...',
          success: 'Solicitud enviada',
          error: 'Error al enviar solicitud',
        },
        { duration: 4500 },
      );
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (error: any) {
      console.error('Error durante el envío del formulario', error);
    }
  });

  return {
    onSubmit,
    register,
    setValue,
    mutation,
    errors,
  };
};

export default usePostVacation;
