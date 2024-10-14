'use client';
import { useState } from 'react';
import Spinner from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { useChangePassword } from '@/hooks';

const ChangePasswordForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { handleSubmit, register, onSubmit, mutation, errors } =
    useChangePassword();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-3">
        <label
          htmlFor="oldPassword"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Contraseña actual
        </label>
        <input
          type="password"
          placeholder="Escribe tu contraseña actual aquí"
          id="oldPassword"
          {...register('OldPassword')}
          className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
        />
        {errors.OldPassword && (
          <div className="text-red-500 text-sm mt-2">
            {errors.OldPassword.message}
          </div>
        )}
      </div>
      <div className="mt-3">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Nueva contraseña
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Escribe tu nueva contraseña aquí"
          id="password"
          {...register('Password')}
          className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
        />
        {errors.Password && (
          <div className="text-red-500 text-sm mt-2">
            {errors.Password.message}
          </div>
        )}
      </div>
      <div className="mt-3">
        <label
          htmlFor="confirmPassword"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Confirmar contraseña
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Confirma tu contraseña aquí"
          id="confirmPassword"
          {...register('ConfirmPassword')}
          className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
        />
        {errors.ConfirmPassword && (
          <div className="text-red-500 text-sm mt-2">
            {errors.ConfirmPassword.message}
          </div>
        )}
      </div>
      <div className="mt-3">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className=" h-4 w-4 rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
          />
          <span className="ml-3 text-sm text-gray-600">Mostrar contraseña</span>
        </label>
      </div>
      {errors.root && (
        <div className="text-red-500 text-sm mt-2">{errors.root.message}</div>
      )}
      <Button
        type="submit"
        className="w-full mt-4"
        disabled={mutation.isPending}
      >
        <div className="flex justify-center items-center">
          {mutation.isPending ? <Spinner /> : <span>Actualizar</span>}
        </div>
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
