import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays } from "lucide-react"

interface AvailableVacationDaysProps {
  days: number
}

export function AvailableVacationDays({ days }: AvailableVacationDaysProps) {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-700">Días de vacaciones disponibles</CardTitle>
        <CalendarDays className="h-4 w-4 text-blue-600" />
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-bold text-blue-600">{days}</div>
          <div className="text-sm text-gray-600">días</div>
        </div>
        <p className="text-xs text-gray-500 mt-1">Recuerda planificar tus vacaciones con anticipación</p>
      </CardContent>
    </Card>
  )
}
