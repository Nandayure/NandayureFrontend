import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { ResetPassword } from '@/types';
import { ResetPasswordSchema } from '@/schemas';
import { postResetPassword } from '@/services';

interface Props {
  token: string;
}

type FormsFields = z.infer<typeof ResetPasswordSchema>;

const usePostResetPassword = ({ token }: Props) => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: ResetPassword) =>
      await postResetPassword(data, token),
    onError: (error: any) => {
      setError('root', error.message);
    },
  });

  const onSubmit: SubmitHandler<FormsFields> = async (data) => {
    try {
      const response = await toast.promise(
        mutation.mutateAsync(data),
        {
          loading: 'Cargando...',
          success:
            'Contraseña editada exitosamente. Serás redirigido a la página inicial en breve.',
          error:
            'El enlace que intentas usar ya ha sido utilizado o ha expirado. Por favor, solicita uno nuevo para continuar.',
        },
        { duration: 2500 },
      );
      const { Employee } = response;
      const EmployeeId = Employee.id;
      const { Password: Password } = data;

      // Use signIn to log in the user
      await signIn('credentials', {
        redirect: false,
        EmployeeId,
        Password,
      });
      setTimeout(() => {
        router.push('/');
      }, 2500);
    } catch (error: any) {
      setError('root', error.message);
    }
  };

  return {
    handleSubmit,
    register,
    onSubmit,
    mutation,
    errors,
  };
};
export default usePostResetPassword;
