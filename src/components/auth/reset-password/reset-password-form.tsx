"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Lock, Shield, Loader2 } from "lucide-react"
import { usePostResetPassword } from "@/hooks"

interface Props {
  token: string
}

const ResetPasswordForm = ({ token }: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { handleSubmit, register, onSubmit, mutation, errors } = usePostResetPassword({
    token,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-slate-700">
          Nueva contraseña
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Introduce tu nueva contraseña"
            id="password"
            {...register("Password")}
            className={`pl-10 pr-10 ${errors?.Password ? "border-destructive focus-visible:ring-destructive" : ""}`}
            aria-describedby={errors?.Password ? "password-error" : undefined}
            aria-invalid={!!errors?.Password}
          />
        </div>
        {errors?.Password && (
          <Alert variant="destructive" className="py-2">
            <AlertDescription id="password-error" className="text-sm">
              {errors.Password.message}
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
          Confirmar contraseña
        </Label>
        <div className="relative">
          <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Confirma tu nueva contraseña"
            id="confirmPassword"
            {...register("ConfirmPassword")}
            className={`pl-10 ${errors?.ConfirmPassword ? "border-destructive focus-visible:ring-destructive" : ""}`}
            aria-describedby={errors?.ConfirmPassword ? "confirm-password-error" : undefined}
            aria-invalid={!!errors?.ConfirmPassword}
          />
        </div>
        {errors?.ConfirmPassword && (
          <Alert variant="destructive" className="py-2">
            <AlertDescription id="confirm-password-error" className="text-sm">
              {errors.ConfirmPassword.message}
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Show Password Checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="show-password"
          checked={showPassword}
          onCheckedChange={(checked) => setShowPassword(checked === true)}
          aria-describedby="show-password-description"
        />
        <Label htmlFor="show-password" className="text-sm text-slate-600 cursor-pointer" id="show-password-description">
          Mostrar contraseñas
        </Label>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={mutation.isPending}
        className="w-full"
        aria-describedby="submit-button-description"
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Actualizando contraseña...
          </>
        ) : (
          <>
            <Lock className="mr-2 h-4 w-4" />
            Actualizar contraseña
          </>
        )}
      </Button>

      <p id="submit-button-description" className="sr-only">
        Haz clic para actualizar tu contraseña con los datos introducidos
      </p>

      {/* Security Note */}
      <div className="text-center">
        <p className="text-xs text-slate-500">Tu contraseña será encriptada y almacenada de forma segura.</p>
      </div>
    </form>
  )
}

export default ResetPasswordForm
