import useGetToken from '@/hooks/common/useGetToken';
import { postSalaryCertificates } from '@/services';
import { RequestSalaryCertificate } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const usePostSalaryCetificates = () => {
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { token } = useGetToken();

  const mutation = useMutation({
    mutationFn: async (data: RequestSalaryCertificate) =>
      await postSalaryCertificates(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getCurrentToApprove'],
      });
    },
    onError: (error: any) => {
      console.error(error);
    },
  });

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      await toast.promise(
        new Promise((resolve, reject) => {
          setTimeout(async () => {
            try {
              await mutation.mutateAsync(data);
              resolve('Solicitud enviada');
              setTimeout(() => {
                router.push('/');
              }, 1000);
            } catch (error) {
              reject('Error al enviar solicitud');
            }
          }, 500); // artificial waiting
        }),
        {
          loading: 'Enviando solicitud...',
          success: 'Solicitud enviada',
          error: 'Error al enviar solicitud',
        },
        { duration: 4500 },
      );
    } catch (error: any) {
      console.error(error);
    }
  });

  return {
    onSubmit,
    register,
    mutation,
  };
};
export default usePostSalaryCetificates;
