'use client';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/ui/spinner';
import usePostLogin from '@/hooks/auth/login/usePostLogin';
import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, errors, onSubmit, isLoading, error } = usePostLogin();

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div>
        <label
          htmlFor="EmployeeId"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Identificación
        </label>
        <input
          type="text"
          placeholder="Escribe tu identificación aquí"
          id="EmployeeId"
          data-cy="login-input-id"
          className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
          {...register('EmployeeId')}
        />
        {errors.EmployeeId && (
          <p className="text-red-500 text-xs mt-1">
            {errors.EmployeeId.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Contraseña
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Escribe tu contraseña aquí"
            id="password"
            data-cy="login-input-password"
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
            {...register('Password')}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.Password && (
          <p className="text-red-500 text-xs mt-1">{errors.Password.message}</p>
        )}
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>

      <div className="flex">
        <Link href="/auth/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      <Button className="w-full mt-4" type="submit" disabled={isLoading} data-cy="login-button">
        {isLoading ? <Spinner /> : 'Iniciar Sesión'}
      </Button>
    </form>
  );
};

export default LoginForm;
