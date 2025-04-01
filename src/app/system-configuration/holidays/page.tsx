import { CreateHolidayModal } from "@/components/holidays/create-holiday"
import HolidaysGrid from "@/components/holidays/holidays-grid"
import { Separator } from "@/components/ui/separator"

export const metadata = {
  title: "Días Feriados",
  description: "Gestión de días feriados para el sistema de Recursos Humanos",
}

export default async function Page() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Días Feriados</h1>
          <p className="text-muted-foreground text-sm max-w-2xl">
            Calendario oficial de días feriados y no laborables para el año en curso.
          </p>
        </div>
        <CreateHolidayModal />
      </div>

      <Separator className="my-6" />

      <HolidaysGrid />
    </div>
  )
}

