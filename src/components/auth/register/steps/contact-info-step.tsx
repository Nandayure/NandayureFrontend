"use client"

import { useFormContext, useWatch } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { useCheckEmail } from "@/hooks/validations/useValidations"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { useEffect, useRef } from "react"
import { Separator } from "@/components/ui/separator"
import Image from 'next/image'

export function ContactInfoStep() {
  const { control, setError, clearErrors, formState } = useFormContext()

  // Ref para prevenir actualizaciones recursivas
  const processingEmailValidationRef = useRef(false);

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
    enabled: email?.length >= 5 && !processingEmailValidationRef.current,
    retry: 0
  })

  // Efecto para manejar la validación del email
  useEffect(() => {
    if (!emailWasChecked || email.length < 5 || processingEmailValidationRef.current) return;

    processingEmailValidationRef.current = true;

    try {
      if (emailCheck?.exists === true) {
        // Solo actualizar el error si no existe ya o si el mensaje es diferente
        if (formState.errors.Email?.type !== "manual" ||
          formState.errors.Email?.message !== "Este correo electrónico ya está registrado") {
          setError("Email", {
            type: "manual",
            message: "Este correo electrónico ya está registrado"
          });
        }
      } else {
        if (formState.errors.Email?.type === "manual") {
          clearErrors("Email");
        }
      }
    } catch (error) {
      console.error('Error validating email:', error);
    } finally {
      processingEmailValidationRef.current = false;
    }
  }, [emailCheck, emailWasChecked, email, setError, clearErrors, formState.errors.Email?.type]);

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
                      <CheckCircle className="h-4 w-4 text-success text-apple-500" />
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
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Image src="/CR-flag.svg" alt="Costa Rica" width={24} height={16} className="mr-1" />
                    <span className="text-sm">+506</span>
                    <Separator orientation="vertical" className="h-5 mx-2" />
                  </div>
                  <Input
                    className="pl-24"
                    placeholder="Ingrese 8 dígitos (ej: 88887777)"
                    {...field}
                    maxLength={8}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

