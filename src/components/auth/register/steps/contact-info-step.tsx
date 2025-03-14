"use client"

import { useFormContext, useWatch } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { useCheckEmail } from "@/hooks/validations/useValidations"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { useEffect } from "react"

export function ContactInfoStep() {
  const { control, setError, clearErrors, formState } = useFormContext()

  // Observar cambios en el campo Email
  const email = useWatch({
    control,
    name: "Email",
    defaultValue: ""
  })

  // Usar el hook de validación con debounce implícito
  const {
    data: emailCheck,
    isLoading: isCheckingEmail,
    isFetched: emailWasChecked
  } = useCheckEmail(email?.length >= 5 ? email : undefined, {
    // Solo habilitar la consulta cuando el email tenga al menos 5 caracteres
    enabled: email?.length >= 5,
    retry: 0 // No reintentar en caso de error
  })

  // Efecto para actualizar errores del formulario basado en la existencia del correo
  useEffect(() => {
    if (emailWasChecked && emailCheck?.exists === true) {
      setError("Email", {
        type: "manual",
        message: "Este correo electrónico ya está registrado"
      });
    } else if (emailWasChecked && emailCheck?.exists === false && formState.errors.Email?.type === "manual") {
      clearErrors("Email");
    }
  }, [emailCheck, emailWasChecked, setError, clearErrors, formState.errors.Email]);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Información de Contacto</h2>
        <p className="text-muted-foreground">Ingrese la información de contacto del empleado.</p>
      </div>

      <div className="grid gap-4">
        <FormField
          control={control}
          name="Email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electrónico</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input type="email" placeholder="correo@ejemplo.com" {...field} />
                </FormControl>
                {email?.length >= 5 && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {isCheckingEmail && (
                      <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
                    )}
                    {!isCheckingEmail && emailWasChecked && emailCheck?.exists === true && (
                      <AlertCircle className="h-4 w-4 text-destructive" />
                    )}
                    {!isCheckingEmail && emailWasChecked && emailCheck?.exists === false && (
                      <CheckCircle className="h-4 w-4 text-success" />
                    )}
                  </div>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="CellPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono Celular</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese 8 dígitos (ej: 88887777)" {...field} maxLength={8} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

