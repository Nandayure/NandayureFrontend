"use client"

import { Calendar, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HolidayEmptyStateProps {
  activeTab: "all" | "active" | "inactive"
  onAddHoliday: () => void
}

export function HolidayEmptyState({ activeTab, onAddHoliday }: HolidayEmptyStateProps) {
  const getMessage = () => {
    if (activeTab === "all") {
      return "Comienza agregando tu primer día feriado."
    }
    if (activeTab === "active") {
      return "No hay días feriados activos. Intenta cambiar el filtro o agrega un nuevo día feriado."
    }
    return "No hay días feriados inactivos. Intenta cambiar el filtro o agrega un nuevo día feriado."
  }

  const getTitle = () => {
    if (activeTab === "all") {
      return "No se encontraron días feriados"
    }
    if (activeTab === "active") {
      return "No hay días feriados activos"
    }
    return "No hay días feriados inactivos"
  }

  return (
    <div className="flex h-[40vh] flex-col items-center justify-center rounded-xl border border-dashed p-10 text-center animate-in">
      <div
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center mb-6",
          activeTab === "all" ? "bg-primary/10" : activeTab === "active" ? "bg-success/10" : "bg-muted",
        )}
      >
        <Calendar
          className={cn(
            "h-8 w-8",
            activeTab === "all" ? "text-primary" : activeTab === "active" ? "text-success" : "text-muted-foreground",
          )}
        />
      </div>
      <h3 className="mb-3 text-xl font-medium">{getTitle()}</h3>
      <p className="mb-6 text-sm text-muted-foreground max-w-md">{getMessage()}</p>
      <Button
        onClick={onAddHoliday}
        className="relative overflow-hidden group transition-all hover:shadow-md active:scale-95"
        size="lg"
      >
        <span className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full"></span>
        <span className="relative flex items-center justify-center gap-2">
          <Plus className="h-4 w-4" />
          Agregar Día Feriado
        </span>
      </Button>
    </div>
  )
}

