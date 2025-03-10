"use client"

import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { format, subYears } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { useGetAllCivilStatus, useGetAllGender } from "@/hooks"
import { useState } from "react"
import { Input } from "@/components/ui/input"

export function PersonalInfoStep() {
  const { genders } = useGetAllGender()
  const { civilStatus } = useGetAllCivilStatus()
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const [calendarMonth, setCalendarMonth] = useState(() => {
    const eighteenYearsAgo = subYears(new Date(), 18)
    return new Date(eighteenYearsAgo.getFullYear(), 0) // January of the year
  })

  const generateYearRange = () => {
    const currentYear = new Date().getFullYear()
    const startYear = currentYear - 120
    const years = []
    for (let year = currentYear - 18; year >= startYear; year--) {
      years.push(year)
    }
    return years
  }

  const years = generateYearRange()

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Información Personal</h2>
        <p className="text-muted-foreground">Ingrese la información personal del empleado.</p>
      </div>

      <div className="grid gap-4">
        <FormField
          control={control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cédula</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese la cédula (9 dígitos)" {...field} maxLength={9} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="Name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese el nombre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="Surname1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primer Apellido</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese el primer apellido" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="Surname2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Segundo Apellido</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese el segundo apellido" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="Birthdate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha de Nacimiento</FormLabel>
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
                  <div className="flex items-center justify-between px-3 py-2 border-b">
                    <Select
                      value={calendarMonth.getFullYear().toString()}
                      onValueChange={(value) => setCalendarMonth(new Date(Number.parseInt(value, 10), 0))}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Seleccione año" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => field.onChange(date ? date.toISOString() : "")}
                    disabled={(date) => {
                      const now = new Date()
                      const eighteenYearsAgo = subYears(now, 18)
                      const oneHundredTwentyYearsAgo = subYears(now, 120)
                      return date > eighteenYearsAgo || date < oneHundredTwentyYearsAgo
                    }}
                    initialFocus
                    month={calendarMonth}
                    onMonthChange={setCalendarMonth}
                    defaultMonth={subYears(new Date(), 18)}
                    classNames={{
                      head_cell: "text-muted-foreground font-normal text-xs",
                      cell: cn(
                        "h-8 w-8 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                      ),
                      day: cn("h-8 w-8 p-0 font-normal aria-selected:opacity-100"),
                      day_selected:
                        "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                      day_outside: "text-muted-foreground opacity-50",
                      day_disabled: "text-muted-foreground opacity-50",
                      day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                      day_hidden: "invisible",
                      nav: "space-x-1 flex items-center",
                      nav_button: cn("h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"),
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      table: "w-full border-collapse space-y-1",
                    }}
                    components={{
                      IconLeft: () => <ChevronLeft className="h-4 w-4" />,
                      IconRight: () => <ChevronRight className="h-4 w-4" />,
                    }}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="GenderId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Género</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number.parseInt(value, 10))}
                  value={field.value?.toString() || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un género" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {genders?.map((gender) => (
                      <SelectItem key={gender.id} value={gender.id.toString()}>
                        {gender.Name}
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
            name="MaritalStatusId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado Civil</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number.parseInt(value, 10))}
                  value={field.value?.toString() || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un estado civil" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {civilStatus?.map((status) => (
                      <SelectItem key={status.id} value={status.id.toString()}>
                        {status.Name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  )
}

