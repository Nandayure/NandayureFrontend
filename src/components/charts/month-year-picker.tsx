"use client"

import { useDatesWithRequests } from "@/hooks"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"

interface MonthYearPickerProps {
  onYearChange: (year: number) => void
  onMonthChange: (month: number) => void
  selectedYear: number
  selectedMonth: number
}

export function MonthYearPicker({ onYearChange, onMonthChange, selectedYear, selectedMonth }: MonthYearPickerProps) {
  const { datesWithRequests, isLoading, isError } = useDatesWithRequests()
  const [availableMonths, setAvailableMonths] = useState<number[]>([])
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false)
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false)
  const yearRef = useRef<HTMLDivElement>(null)
  const monthRef = useRef<HTMLDivElement>(null)

  // Update available months when selected year changes
  useEffect(() => {
    if (datesWithRequests && selectedYear) {
      const yearData = datesWithRequests.find((y) => y.year === selectedYear)
      setAvailableMonths(yearData?.months || [])
    }
  }, [datesWithRequests, selectedYear])

  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (yearRef.current && !yearRef.current.contains(event.target as Node)) {
        setYearDropdownOpen(false)
      }
      if (monthRef.current && !monthRef.current.contains(event.target as Node)) {
        setMonthDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Filtros</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-28" />
        </CardContent>
      </Card>
    )
  }

  if (isError || !datesWithRequests || datesWithRequests.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No hay datos disponibles para filtrar</p>
        </CardContent>
      </Card>
    )
  }

  // List of available years from data
  const years = datesWithRequests.map((y) => y.year)

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Filtros</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4">
        {/* Custom Year Select */}
        <div className="w-32 relative" ref={yearRef}>
          <button
            type="button"
            className="w-full flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
            aria-haspopup="listbox"
            aria-expanded={yearDropdownOpen}
          >
            <span>{selectedYear || "Año"}</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </button>

          {yearDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full rounded-md border border-input bg-popover shadow-md">
              <ul className="max-h-60 overflow-auto py-1 text-sm" role="listbox">
                {years.map((year) => (
                  <li
                    key={year}
                    className={`relative cursor-pointer select-none py-1.5 px-2 hover:bg-accent hover:text-accent-foreground ${year === selectedYear ? "bg-accent text-accent-foreground" : ""
                      }`}
                    onClick={() => {
                      onYearChange(year)
                      setYearDropdownOpen(false)
                    }}
                    role="option"
                    aria-selected={year === selectedYear}
                  >
                    {year}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Custom Month Select */}
        <div className="w-40 relative" ref={monthRef}>
          <button
            type="button"
            className="w-full flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => setMonthDropdownOpen(!monthDropdownOpen)}
            disabled={availableMonths.length === 0}
            aria-haspopup="listbox"
            aria-expanded={monthDropdownOpen}
          >
            <span>{selectedMonth ? monthNames[selectedMonth - 1] : "Mes"}</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </button>

          {monthDropdownOpen && availableMonths.length > 0 && (
            <div className="absolute z-10 mt-1 w-full rounded-md border border-input bg-popover shadow-md">
              <ul className="max-h-60 overflow-auto py-1 text-sm" role="listbox">
                {availableMonths.map((month) => (
                  <li
                    key={month}
                    className={`relative cursor-pointer select-none py-1.5 px-2 hover:bg-accent hover:text-accent-foreground ${month === selectedMonth ? "bg-accent text-accent-foreground" : ""
                      }`}
                    onClick={() => {
                      onMonthChange(month)
                      setMonthDropdownOpen(false)
                    }}
                    role="option"
                    aria-selected={month === selectedMonth}
                  >
                    {monthNames[month - 1]}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

