import HolidaysGrid from "@/components/holidays/holidays-grid"

export const metadata = {
  title: "Días Feriados",
  description: "Gestión de días feriados para el sistema de Recursos Humanos",
}

export default async function Page() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6">
      <div className="space-y-3 mb-6">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Días Feriados</h1>
        <p className="text-muted-foreground text-sm max-w-3xl">
          Calendario oficial de días feriados y no laborables para el año en curso. Estos días son considerados como no
          laborables para efectos de cálculos de asistencia y nómina.
        </p>
      </div>

      <HolidaysGrid />
    </div>
  )
}

