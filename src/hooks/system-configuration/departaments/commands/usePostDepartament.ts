import { postDepartament } from '@/services';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const usePostDepartament = () => {
  const { register, handleSubmit } = useForm();
  const mutation = useMutation({
    mutationFn: async (data: any) => await postDepartament(data),
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
              resolve('Departamento creado');
            } catch (error) {
              reject('Error al crear departamento');
            }
          }, 500);
        }),
        {
          loading: 'Creando departamento...',
          success: 'Departamento creado',
          error: 'Error al crear departamento',
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
export default usePostDepartament;
