"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { CalendarIcon, Loader2, Edit, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useUpdateHoliday } from "@/hooks/holiday/commands/useUpdateHoliday"
import { Holiday } from "@/types"

interface UpdateHolidayModalProps {
  holiday: Holiday;
  trigger?: React.ReactNode;
}

export function UpdateHolidayModal({ holiday, trigger }: UpdateHolidayModalProps) {
  const {
    form,
    isOpen,
    setIsOpen,
    onSubmit,
    isPending,
  } = useUpdateHoliday({ holiday })

  const isRecurringYearly = form.watch("isRecurringYearly")

  // Generar opciones para días 1-31
  const dayOptions = Array.from({ length: 31 }, (_, i) => i + 1)

  // Opciones para meses (1-12)
  const monthOptions = [
    { value: 1, label: "Enero" },
    { value: 2, label: "Febrero" },
    { value: 3, label: "Marzo" },
    { value: 4, label: "Abril" },
    { value: 5, label: "Mayo" },
    { value: 6, label: "Junio" },
    { value: 7, label: "Julio" },
    { value: 8, label: "Agosto" },
    { value: 9, label: "Septiembre" },
    { value: 10, label: "Octubre" },
    { value: 11, label: "Noviembre" },
    { value: 12, label: "Diciembre" },
  ]

  return (
    <div>
      {trigger ? (
        <div onClick={() => setIsOpen(true)}>{trigger}</div>
      ) : (
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="w-full transition-all duration-300 hover:shadow-sm"
        >
          <Edit className="h-4 w-4 mr-2" />
          Editar
        </Button>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px] p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-semibold">
              Editar día feriado
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mt-1">
              Modifique la información del día feriado.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Nombre del día feriado */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Nombre del feriado</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej. Día de la Independencia"
                        className="transition-all focus-visible:ring-offset-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Switch para isRecurringYearly */}
              <FormField
                control={form.control}
                name="isRecurringYearly"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/30">
                    <div className="space-y-0.5">
                      <div className="flex items-center">
                        <FormLabel className="text-sm font-medium">Recurrente anual</FormLabel>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 ml-2 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p>
                                Al activar esta opción, el feriado se repetirá automáticamente todos los años en la
                                misma fecha.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <FormDescription className="text-xs">
                        Se repetirá todos los años en la misma fecha
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-primary"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Campos condicionales según isRecurringYearly */}
              <div
                className={cn(
                  "transition-all duration-300 space-y-5",
                  isRecurringYearly ? "opacity-100" : "opacity-100",
                )}
              >
                {isRecurringYearly ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    {/* Mes recurrente */}
                    <FormField
                      control={form.control}
                      name="recurringMonth"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="text-sm font-medium">Mes</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(Number.parseInt(value))}
                            value={field.value?.toString()}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full transition-all focus-visible:ring-offset-2">
                                <SelectValue placeholder="Seleccionar mes" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-[200px]">
                              {monthOptions.map((month) => (
                                <SelectItem
                                  key={month.value}
                                  value={month.value.toString()}
                                  className="cursor-pointer transition-colors hover:bg-muted"
                                >
                                  {month.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Día recurrente */}
                    <FormField
                      control={form.control}
                      name="recurringDay"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="text-sm font-medium">Día</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(Number.parseInt(value))}
                            value={field.value?.toString()}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full transition-all focus-visible:ring-offset-2">
                                <SelectValue placeholder="Seleccionar día" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-[200px]">
                              {dayOptions.map((day) => (
                                <SelectItem
                                  key={day}
                                  value={day.toString()}
                                  className="cursor-pointer transition-colors hover:bg-muted"
                                >
                                  {day}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                ) : (
                  // Campo de fecha específica cuando no es recurrente
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-sm font-medium">Fecha específica</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal transition-all focus-visible:ring-offset-2",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(parseISO(field.value), "PPP", { locale: es })
                                ) : (
                                  <span>Seleccionar fecha</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value ? parseISO(field.value) : undefined}
                              onSelect={(date) => {
                                if (date) {
                                  // Asegurarse de usar UTC para evitar problemas de zona horaria
                                  const year = date.getFullYear();
                                  const month = String(date.getMonth() + 1).padStart(2, '0');
                                  const day = String(date.getDate()).padStart(2, '0');
                                  // Formato YYYY-MM-DD sin conversiones adicionales que puedan afectar la zona horaria
                                  const formattedDate = `${year}-${month}-${day}`;
                                  field.onChange(formattedDate);
                                }
                              }}
                              initialFocus
                              locale={es}
                              className="rounded-md border"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription className="text-xs mt-1">
                          Seleccione la fecha exacta para este feriado
                        </FormDescription>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              {/* Estado activo */}
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/30">
                    <div className="space-y-0.5">
                      <div className="flex items-center">
                        <FormLabel className="text-sm font-medium">Estado activo</FormLabel>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 ml-2 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Los días feriados inactivos no serán considerados en los cálculos del sistema.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <FormDescription className="text-xs">
                        El día feriado estará habilitado en el sistema
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-primary"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-6 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  disabled={isPending}
                  className="transition-all duration-200 hover:bg-muted"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="transition-all duration-300 hover:shadow-sm"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Actualizando...
                    </>
                  ) : (
                    "Actualizar"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}