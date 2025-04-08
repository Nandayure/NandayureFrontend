"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { format, isSameDay, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Flag from "@/components/common/Flag"
import Spinner from "@/components/ui/spinner"
import { titleFont } from "@/lib/fonts"
import { usePostVacation } from "@/hooks"
import useGetHolidays from "@/hooks/holiday/queries/useGetHolidays"

export default function RequestVacationForm() {
  const [date, setDate] = useState<DateRange | undefined>(undefined)
  const { holidays, isError, isLoading, error } = useGetHolidays()
  const [disabledDates, setDisabledDates] = useState<Date[]>([])

  // Process holidays to determine which dates to disable
  useEffect(() => {
    if (holidays && holidays.length > 0) {
      const currentYear = new Date().getFullYear()
      const nextYear = currentYear + 1
      const holidayDates: Date[] = []

      // Process each holiday
      holidays.forEach((holiday) => {
        if (holiday.isRecurringYearly && holiday.recurringMonth && holiday.recurringDay) {
          // For recurring holidays, add for current and next year
          holidayDates.push(new Date(currentYear, holiday.recurringMonth - 1, holiday.recurringDay))
          holidayDates.push(new Date(nextYear, holiday.recurringMonth - 1, holiday.recurringDay))
        } else if (holiday.specificDate) {
          // For specific date holidays - FIX: Use parseISO to correctly handle timezone issues
          // Añadir 'T12:00:00' asegura que la fecha se interprete al mediodía, evitando problemas de zona horaria
          holidayDates.push(parseISO(`${holiday.specificDate}T12:00:00`))
        }
      })

      setDisabledDates(holidayDates)
    }
  }, [holidays])

  // Function to check if a date is a holiday
  const isHoliday = (date: Date) => {
    return disabledDates.some((holidayDate) => isSameDay(date, holidayDate))
  }

  // Function to calculate business days (excluding weekends and holidays)
  const calculateBusinessDays = (startDate: Date, endDate: Date): number => {
    let count = 0
    const currentDate = new Date(startDate)

    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay()
      // Skip weekends and holidays
      if (dayOfWeek !== 0 && dayOfWeek !== 6 && !isHoliday(currentDate)) {
        count++
      }
      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return count
  }

  // Calculate total business days when date range changes
  const totalDays = date?.from && date?.to ? calculateBusinessDays(date.from, date.to) : 0

  const { onSubmit: submitVacationRequest, setValue, mutation, errors } = usePostVacation()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (date?.from && date?.to) {
      setValue("entryDate", format(date.from, 'yyyy-MM-dd'))
      setValue("departureDate", format(date.to, 'yyyy-MM-dd'))
      submitVacationRequest()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h5 className={`${titleFont.className} mb-3 text-base font-semibold text-gray-900 md:text-xl`}>
        Solicitud de vacaciones
      </h5>
      <p className="mb-4 text-sm font-normal text-gray-500 dark:text-gray-400">
        Por favor, selecciona el rango de fechas para tu solicitud de vacaciones.
      </p>
      <Flag />

      <div className="grid gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y", { locale: es })} - {format(date.to, "LLL dd, y", { locale: es })}
                  </>
                ) : (
                  format(date.from, "LLL dd, y", { locale: es })
                )
              ) : (
                <span>Selecciona un rango de fechas</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              locale={es}
              disabled={[
                ...disabledDates, // Deshabilitar días festivos
                { before: new Date() }, // Deshabilitar fechas pasadas
                { dayOfWeek: [0, 6] }, // Deshabilitar fines de semana
              ]}
            />
          </PopoverContent>
        </Popover>
      </div>

      {date?.from && date?.to && (
        <div className="mt-2 text-sm font-medium text-gray-700">
          Total días laborables seleccionados: <span className="font-semibold text-primary">{totalDays}</span>
        </div>
      )}

      {isLoading && <div className="mt-2 text-sm text-blue-500">Cargando días festivos...</div>}
      {isError && <div className="mt-2 text-sm text-red-500">Error al cargar días festivos</div>}
      {errors?.root && <div className="mt-2 text-sm text-red-500">{errors.root.message}</div>}

      <div className="mt-4 flex w-full justify-end">
        <Button type="submit" className="w-full sm:w-auto" disabled={mutation.isPending || !date?.from || !date?.to}>
          {mutation.isPending ? <Spinner /> : "Enviar solicitud"}
        </Button>
      </div>
    </form>
  )
}

