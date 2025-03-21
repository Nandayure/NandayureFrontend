'use client';
import Link from 'next/link';
import Spinner from '@/components/ui/spinner';
import { titleFont } from '@/lib/fonts';
import { Button } from '@/components/ui/button';
import usePostSendEmail from '@/hooks/auth/forgot-password/usePostSendEmail';

const ForgotPasswordForm = () => {
  const { handleSubmit, onSubmit, register, mutation, emailSent, errors } =
    usePostSendEmail();

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {!emailSent ? (
        <>
          <h5
            className={`${titleFont.className} mb-3 text-base font-semibold text-gray-900 md:text-xl`}
          >
            Recuperar contraseña
          </h5>
          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Por favor, introduce tu dirección de correo electrónico. Recibirás
            un enlace para crear una nueva contraseña.
          </p>
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              {...register('Email')}
              placeholder="Escribe tu correo electrónico aquí"
              className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-xs focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
            />
            {errors.Email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.Email.message}
              </p>
            )}
          </div>
          {errors.root && (
            <p className="text-red-500 text-sm mt-2">{errors.root.message}</p>
          )}
          <Button
            type="submit"
            className="mt-4 w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? <Spinner /> : 'Enviar correo'}
          </Button>
        </>
      ) : (
        <>
          <h5
            className={`${titleFont.className} mb-3 text-base text-center font-semibold text-gray-900 md:text-xl`}
          >
            Correo enviado
          </h5>
          <p className="text-center text-sm text-gray-700 mt-4">
            Revisa tu correo electrónico para un enlace para restablecer tu
            contraseña. Si no aparece en unos minutos, revisa tu carpeta de
            spam.
          </p>
        </>
      )}
      <section>
        <Link href="/auth/login">
          <Button className="mt-4 w-full" variant={'link'}>
            Regresar al inicio de sesión
          </Button>
        </Link>
      </section>
    </form>
  );
};

export default ForgotPasswordForm;
