"use client"

import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"

export function ContactInfoStep() {
  const { control } = useFormContext()

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
              <FormControl>
                <Input type="email" placeholder="correo@ejemplo.com" {...field} />
              </FormControl>
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

