import useGetToken from '@/hooks/common/useGetToken';
import { postPaySlip } from '@/services';
import { RequestPaySlip } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const usePostPaySlip = () => {
  const { register, handleSubmit } = useForm();
  const { token } = useGetToken();

  const mutation = useMutation({
    mutationFn: async (data: RequestPaySlip) => await postPaySlip(data, token),
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
        { duration: 2500 },
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
export default usePostPaySlip;
