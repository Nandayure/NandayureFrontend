"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import usePostLogin from "@/hooks/auth/login/usePostLogin"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { register, errors, onSubmit, isLoading, error } = usePostLogin()

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="EmployeeId" className="text-sm font-medium text-gray-700">
            Identificación
          </Label>
          <Input
            type="text"
            id="EmployeeId"
            placeholder="Escribe tu identificación aquí"
            data-cy="login-input-id"
            className="w-full border-gray-300 focus:border-[#34b1fd] focus:ring-[#34b1fd]"
            {...register("EmployeeId")}
            aria-invalid={errors.EmployeeId ? "true" : "false"}
          />
          {errors.EmployeeId && (
            <p className="text-red-500 text-sm" role="alert">
              {errors.EmployeeId.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">
            Contraseña
          </Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Escribe tu contraseña aquí"
              data-cy="login-input-password"
              className="w-full pr-10 border-gray-300 focus:border-[#34b1fd] focus:ring-[#34b1fd]"
              {...register("Password")}
              aria-invalid={errors.Password ? "true" : "false"}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center  text-gray-500 cursor-pointer"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </Button>
          </div>
          {errors.Password && (
            <p className="text-red-500 text-sm" role="alert">
              {errors.Password.message}
            </p>
          )}
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-3" role="alert">
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="flex justify-end">
          <Link href="/auth/forgot-password" className="text-sm font-medium text-[#34b1fd] hover:text-[#2d9fe6]">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>

      <Button
        className="w-full bg-[#34b1fd] hover:bg-[#2d9fe6] text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg cursor-pointer"
        type="submit"
        disabled={isLoading}
        data-cy="login-button"
      >
        {isLoading ? (
          <>
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
            Cargando...
          </>
        ) : (
          "Iniciar Sesión"
        )}
      </Button>
    </form>
  )
}

export default LoginForm

