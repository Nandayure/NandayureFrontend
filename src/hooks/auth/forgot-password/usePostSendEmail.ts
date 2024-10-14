import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { ForgotPassword } from '@/types';
import { EmailSendSchema } from '@/schemas';
import { postForgotPassword } from '@/services';

type FormsFields = z.infer<typeof EmailSendSchema>;

const usePostSendEmail = () => {
  const [emailSent, setEmailSent] = useState(false);
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(EmailSendSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: ForgotPassword) => await postForgotPassword(data),
    onError: (error: any) => {
      console.error(error);
      setError('root', error.message);
    },
  });

  const onSubmit: SubmitHandler<FormsFields> = async (data) => {
    try {
      const mutationPromise = await toast.promise(
        new Promise((resolve, reject) => {
          setTimeout(async () => {
            try {
              await mutation.mutateAsync(data);
              resolve('Correo enviado');
            } catch (error) {
              reject('Error al enviar correo');
            }
          }, 500); // artificial waiting
        }),
        {
          loading: 'Enviando correo...',
          success: 'Correo enviado',
          error: 'Error al enviar correo',
        },
        { duration: 2500 },
      );
      setEmailSent(true);
      await mutationPromise;
    } catch (error: any) {
      console.error(error);
      setEmailSent(false);
      setError('root', error.message);
    }
  };

  return {
    handleSubmit,
    onSubmit,
    register,
    mutation,
    emailSent,
    errors,
  };
};

export default usePostSendEmail;
