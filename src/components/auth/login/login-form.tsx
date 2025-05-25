"use client"

import { useState } from "react"
import { Eye, EyeOff, User, Lock } from "lucide-react"
import usePostLogin from "@/hooks/auth/login/usePostLogin"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import ForgotPasswordModal from "../forgot-password/forgot-password-modal"

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false)
  const { register, errors, onSubmit, isLoading, error } = usePostLogin()

  const handleForgotPasswordClick = () => {
    setIsForgotPasswordOpen(true)
  }

  const handleCloseForgotPassword = () => {
    setIsForgotPasswordOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Login form */}
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="EmployeeId" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              Cédula de identidad
            </Label>
            <Input
              type="text"
              id="EmployeeId"
              placeholder="Ingresa tu número de cédula"
              data-cy="login-input-id"
              className="w-full h-11 border-gray-300 focus:border-[#34b1fd] focus:ring-[#34b1fd] transition-colors"
              {...register("EmployeeId")}
              aria-invalid={errors.EmployeeId ? "true" : "false"}
              aria-describedby={errors.EmployeeId ? "employeeId-error" : undefined}
            />
            {errors.EmployeeId && (
              <p id="employeeId-error" className="text-red-500 text-sm flex items-center gap-1" role="alert">
                <span className="w-4 h-4 text-red-500">⚠</span>
                {errors.EmployeeId.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Lock className="w-4 h-4 text-gray-500" />
              Contraseña
            </Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Ingresa tu contraseña"
                data-cy="login-input-password"
                className="w-full h-11 pr-10 border-gray-300 focus:border-[#34b1fd] focus:ring-[#34b1fd] transition-colors"
                {...register("Password")}
                aria-invalid={errors.Password ? "true" : "false"}
                aria-describedby={errors.Password ? "password-error" : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-gray-400 focus:outline-none focus:text-gray-600 cursor-pointer transition-all duration-200"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 transition-all duration-200" />
                ) : (
                  <Eye className="h-5 w-5 transition-all duration-200" />
                )}
              </button>
            </div>
            {errors.Password && (
              <p id="password-error" className="text-red-500 text-sm flex items-center gap-1" role="alert">
                <span className="w-4 h-4 text-red-500">⚠</span>
                {errors.Password.message}
              </p>
            )}
          </div>

          {error && (
            <Alert variant="destructive" className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-700 text-sm">{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleForgotPasswordClick}
              className="text-sm font-medium text-[#34b1fd] hover:text-[#2d9fe6] transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-[#34b1fd] focus:ring-offset-2 rounded"
              aria-label="Abrir modal para recuperar contraseña"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </div>

        <Button
          className="w-full h-11 bg-[#34b1fd] hover:bg-[#2d9fe6] text-white font-semibold rounded-lg transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#34b1fd] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          type="submit"
          disabled={isLoading}
          data-cy="login-button"
        >
          {isLoading ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Iniciando sesión...
            </>
          ) : (
            "Iniciar Sesión"
          )}
        </Button>
      </form>

      {/* Footer */}
      <div className="text-center">
        <Separator className="mb-4" />
        <p className="text-xs text-gray-500">¿Necesitas ayuda? Contacta al administrador del sistema</p>
      </div>

      <ForgotPasswordModal isOpen={isForgotPasswordOpen} onClose={handleCloseForgotPassword} />
    </div>
  )
}

export default LoginForm
