"use client"

import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { useGetAllJobPositions } from "@/hooks"

export function JobInfoStep() {
  const { jobPositions } = useGetAllJobPositions()
  const { control } = useFormContext()

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Información Laboral</h2>
        <p className="text-muted-foreground">Ingrese la información laboral del empleado.</p>
      </div>

      <div className="grid gap-4">
        <FormField
          control={control}
          name="HiringDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha de Contratación</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP", { locale: es })
                      ) : (
                        <span>Seleccione una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => field.onChange(date ? date.toISOString() : "")}
                    disabled={(date) => {
                      const now = new Date()
                      const hundredYearsAgo = new Date()
                      hundredYearsAgo.setFullYear(now.getFullYear() - 100)
                      return date > now || date < hundredYearsAgo
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="JobPositionId"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Puesto de Trabajo</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number.parseInt(value, 10))}
                value={field.value?.toString() || ""}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione un puesto" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {jobPositions?.map((position) => (
                    <SelectItem key={position.id} value={position.id.toString()}>
                      {position.Name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="NumberChlidren"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Hijos</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  max={30}
                  placeholder="0"
                  {...field}
                  onChange={(e) => field.onChange(Number.parseInt(e.target.value, 10) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="AvailableVacationDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Días de Vacaciones Disponibles</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  max={365}
                  placeholder="0"
                  {...field}
                  onChange={(e) => field.onChange(Number.parseInt(e.target.value, 10) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

