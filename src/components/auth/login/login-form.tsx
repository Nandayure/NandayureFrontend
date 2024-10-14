'use client';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/ui/spinner';
import usePostLogin from '@/hooks/auth/login/usePostLogin';
import Link from 'next/link';
import React, { useState } from 'react';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { register, errors, onSubmit, isLoading, error } = usePostLogin();
  return (
    <form onSubmit={onSubmit} noValidate>
      <div>
        <label
          htmlFor="EmployeeId"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Identificación
        </label>
        <input
          type="text"
          placeholder="Escribe tu identificación aquí"
          id="EmployeeId"
          className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
          {...register('EmployeeId')}
        />
        {errors.EmployeeId && (
          <p className="text-red-500 text-xs mt-1">
            {errors.EmployeeId.message}
          </p>
        )}
      </div>
      <div className="mt-3">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Contraseña
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Escribe tu contraseña aquí"
          id="password"
          className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
          {...register('Password')}
        />
        {errors.Password && (
          <p className="text-red-500 text-xs mt-1">{errors.Password.message}</p>
        )}
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        <div className="mt-3">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className=" h-4 w-4 rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            <span className="ml-3 text-sm text-gray-600">
              Mostrar contraseña
            </span>
          </label>
        </div>
      </div>
      <Button className="w-full mt-4" type="submit" disabled={isLoading}>
        {isLoading ? <Spinner /> : <span>Iniciar Sesión</span>}
      </Button>
      <div className="mt-2 text-center">
        <Link href="/auth/forgot-password">
          <Button
            variant="link"
          >
            ¿Olvidaste tu contraseña?
          </Button>
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
