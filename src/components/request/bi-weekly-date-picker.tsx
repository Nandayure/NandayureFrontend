"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format, isAfter, isBefore, isWithinInterval, endOfMonth, startOfMonth } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"

type BiWeeklyPeriod = {
  start: Date
  end: Date
  label: string
  value: string
}

interface BiWeeklyDatePickerProps {
  value?: string
  onChange: (value: string) => void
  maxDate?: Date
}

export function BiWeeklyDatePicker({ value, onChange, maxDate = new Date() }: BiWeeklyDatePickerProps) {
  const [date, setSelectedDate] = useState<Date | undefined>(value ? new Date(value) : undefined)
  const [month, setMonth] = useState<Date>(date || new Date())
  const [open, setOpen] = useState(false)
  const [periods, setPeriods] = useState<BiWeeklyPeriod[]>([])

  // Generate bi-weekly periods for the current month
  useEffect(() => {
    const periodsForMonth = getBiWeeklyPeriodsForMonth(month)
    setPeriods(periodsForMonth)
  }, [month])

  // Function to generate bi-weekly periods for a given month
  const getBiWeeklyPeriodsForMonth = (date: Date): BiWeeklyPeriod[] => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const monthName = format(date, "MMMM", { locale: es })

    // First period: 1-15
    const firstPeriodStart = startOfMonth(date)
    const firstPeriodEnd = new Date(year, month, 15)

    // Second period: 16-end of month
    const secondPeriodStart = new Date(year, month, 16)
    const secondPeriodEnd = endOfMonth(date)

    return [
      {
        start: firstPeriodStart,
        end: firstPeriodEnd,
        label: `1-15 ${monthName} ${year}`,
        value: format(firstPeriodEnd, "yyyy-MM-dd"),
      },
      {
        start: secondPeriodStart,
        end: secondPeriodEnd,
        label: `16-${format(secondPeriodEnd, "d")} ${monthName} ${year}`,
        value: format(secondPeriodEnd, "yyyy-MM-dd"),
      },
    ]
  }

  // Function to check if a date is within any bi-weekly period
  const isDateInPeriod = (date: Date, period: BiWeeklyPeriod) => {
    return isWithinInterval(date, { start: period.start, end: period.end })
  }

  // Function to handle date selection
  const handleSelect = (period: BiWeeklyPeriod) => {
    // Only allow selection of periods that are not in the future
    if (isBefore(period.end, maxDate) || format(period.end, "yyyy-MM-dd") === format(maxDate, "yyyy-MM-dd")) {
      setSelectedDate(period.end)
      onChange(period.value)
      setOpen(false)
    }
  }

  // Custom day renderer for the calendar
  const renderDay = (day: Date) => {
    // Find if the day belongs to any period
    const period = periods.find((p) => isDateInPeriod(day, p))

    // Check if the day is the first or last day of a period
    const isFirstDay = period && format(day, "d") === format(period.start, "d")
    const isLastDay = period && format(day, "d") === format(period.end, "d")

    // Check if the period is selectable (not in the future)
    const isSelectable =
      period && (isBefore(period.end, maxDate) || format(period.end, "yyyy-MM-dd") === format(maxDate, "yyyy-MM-dd"))

    // Check if this day's period is selected
    const isSelected = date && period && format(date, "yyyy-MM-dd") === format(period.end, "yyyy-MM-dd")

    return (
      <div
        className={cn(
          "h-9 w-9 p-0 font-normal",
          period && "bg-muted/50",
          isFirstDay && "rounded-l-md",
          isLastDay && "rounded-r-md",
          isSelected && "bg-primary text-primary-foreground",
          !isSelectable && "opacity-50 cursor-not-allowed",
          isSelectable && !isSelected && "hover:bg-primary/10 cursor-pointer",
        )}
      >
        <div className="flex h-full w-full items-center justify-center">{format(day, "d")}</div>
      </div>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            <span>
              {periods.find((p) => p.value === format(date, "yyyy-MM-dd"))?.label ||
                `Quincena: ${format(date, "d MMMM yyyy", { locale: es })}`}
            </span>
          ) : (
            <span>Selecciona una quincena</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3">
          <div className="flex justify-between items-center mb-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="font-medium text-center capitalize">{format(month, "MMMM yyyy", { locale: es })}</div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1))}
              disabled={isAfter(month, new Date())}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            {/* Capa para ocultar el encabezado del calendario */}
            <div className="absolute top-0 left-0 right-0 h-10 bg-white z-10"></div>
            <Calendar
              mode="single"
              month={month}
              onMonthChange={setMonth}
              selected={date}
              disabled={(date) => isAfter(date, maxDate)}
              modifiers={{
                selected: date ? [date] : [],
              }}
              components={{
                Day: ({ date: dayDate }) => renderDay(dayDate),
              }}
              showOutsideDays={false}
              locale={es}
              className="border-none"
            />
          </div>
          <div className="mt-3 space-y-2">
            {periods.map((period) => {
              const isSelectable =
                isBefore(period.end, maxDate) || format(period.end, "yyyy-MM-dd") === format(maxDate, "yyyy-MM-dd")
              const isSelected = date && format(date, "yyyy-MM-dd") === period.value

              return (
                <Button
                  key={period.value}
                  variant={isSelected ? "default" : "outline"}
                  className="w-full justify-start"
                  disabled={!isSelectable}
                  onClick={() => handleSelect(period)}
                >
                  {period.label}
                </Button>
              )
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
