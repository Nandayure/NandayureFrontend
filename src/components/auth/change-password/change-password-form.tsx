"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useChangePassword } from "@/hooks"
import { Eye, EyeOff, Lock, KeyRound, Check } from "lucide-react"
import Spinner from "@/components/ui/spinner"

const ChangePasswordForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { handleSubmit, register, onSubmit, mutation, errors } = useChangePassword()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto w-full">
      <div className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
            Contraseña actual
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <KeyRound className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              placeholder="Escribe tu contraseña actual aquí"
              id="oldPassword"
              {...register("OldPassword")}
              className="block w-full max-w-md pl-10 px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-gray-200 focus:border-gray-400 text-sm sm:text-base"
            />
          </div>
          {errors.OldPassword && <div className="text-red-500 text-sm mt-1">{errors.OldPassword.message}</div>}
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Nueva contraseña
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Escribe tu nueva contraseña aquí"
              id="password"
              {...register("Password")}
              className="block w-full max-w-md pl-10 px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-gray-200 focus:border-gray-400 text-sm sm:text-base"
            />
          </div>
          {errors.Password && <div className="text-red-500 text-sm mt-1">{errors.Password.message}</div>}
        </div>

        <div className="space-y-1">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirmar contraseña
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Check className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirma tu contraseña aquí"
              id="confirmPassword"
              {...register("ConfirmPassword")}
              className="block w-full max-w-md pl-10 px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-gray-200 focus:border-gray-400 text-sm sm:text-base"
            />
          </div>
          {errors.ConfirmPassword && <div className="text-red-500 text-sm mt-1">{errors.ConfirmPassword.message}</div>}
        </div>

        <div className="flex items-center">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-gray-600 shadow-sm focus:border-gray-300 focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            <span className="ml-2 text-sm text-gray-600">Mostrar contraseña</span>
          </label>
        </div>
      </div>

      {errors.root && (
        <div className="bg-red-50 p-3 rounded-md border border-red-200">
          <p className="text-red-600 text-sm">{errors.root.message}</p>
        </div>
      )}

      <div className="pt-4 flex justify-end">
        <Button
          type="submit"
          className="px-6 py-2"
          disabled={mutation.isPending}
        >
          <div className="flex items-center gap-2">
            {mutation.isPending ? <Spinner /> : <span>Actualizar contraseña</span>}
          </div>
        </Button>
      </div>
    </form>
  )
}

export default ChangePasswordForm
