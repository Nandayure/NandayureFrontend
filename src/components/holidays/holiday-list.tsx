"use client"

import { HolidayCard } from "@/components/holidays/holiday-card"
import { HolidayEmptyState } from "@/components/holidays/holiday-empty-state"
import { HolidayLoadingState } from "@/components/holidays/holiday-loading-state"
import { Button } from "@/components/ui/button"
import useGetHolidays from "@/hooks/holiday/queries/useGetHolidays"
import toast from "react-hot-toast"

interface HolidayListProps {
  activeTab: "all" | "active" | "inactive"
  onAddHoliday: () => void
}

export function HolidayList({ activeTab, onAddHoliday }: HolidayListProps) {
  const { holidays, isLoading, isError, refetch } = useGetHolidays()

  const filteredHolidays = holidays?.filter((holiday) => {
    if (activeTab === "all") return true
    if (activeTab === "active") return holiday.isActive
    return !holiday.isActive
  })

  if (isError) {
    return (
      <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4 animate-in">
        <div className="text-center max-w-md p-6 rounded-lg border border-destructive/20 bg-destructive/5">
          <h2 className="text-xl font-semibold mb-2 text-destructive">Error al cargar los días feriados</h2>
          <p className="text-muted-foreground mb-4">No se pudieron cargar los datos. Por favor, intenta nuevamente.</p>
          <Button
            onClick={() => {
              toast.loading("Intentando nuevamente...", { id: "retry" })
              refetch()
                .then(() => {
                  toast.success("¡Datos cargados correctamente!", { id: "retry" })
                })
                .catch(() => {
                  toast.error("No se pudieron cargar los datos", { id: "retry" })
                })
            }}
            className="relative overflow-hidden transition-all hover:shadow-md active:scale-95"
          >
            Intentar de nuevo
          </Button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return <HolidayLoadingState />
  }

  if (!filteredHolidays || filteredHolidays.length === 0) {
    return <HolidayEmptyState activeTab={activeTab} onAddHoliday={onAddHoliday} />
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-in">
      {filteredHolidays.map((holiday, index) => (
        <div
          key={holiday.id}
          className="transition-all duration-300"
          style={{
            animation: `fadeIn 0.3s ease-out forwards ${index * 50}ms`,
            opacity: 0,
          }}
        >
          <HolidayCard holiday={holiday} />
        </div>
      ))}
    </div>
  )
}

