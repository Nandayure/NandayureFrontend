"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HolidayList } from "@/components/holidays/holiday-list"
import { PageHeader } from "@/components/page-header"

export default function HolidaysPage() {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "inactive">("all")
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  return (
    <>
      <div className="container mx-auto py-8 px-4 sm:px-6">
        <PageHeader
          title="Gestión de Días Feriados"
          description="Administra los días feriados y fechas especiales de tu organización"
        />

        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={(value) => setActiveTab(value as any)}>
            <TabsList className="grid w-full grid-cols-3 sm:w-auto">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
              >
                Todos
              </TabsTrigger>
              <TabsTrigger
                value="active"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
              >
                Activos
              </TabsTrigger>
              <TabsTrigger
                value="inactive"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
              >
                Inactivos
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button
            className="w-full sm:w-auto relative overflow-hidden group transition-all hover:shadow-md active:scale-95"
            size="lg"
            onClick={() => setShowCreateDialog(true)}
          >
            <span className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full"></span>
            <span className="relative flex items-center justify-center gap-2">
              <Plus className="h-4 w-4" />
              Agregar Día Feriado
            </span>
          </Button>
        </div>

        <HolidayList activeTab={activeTab} onAddHoliday={() => setShowCreateDialog(true)} />
      </div>
    </>
  )
}

