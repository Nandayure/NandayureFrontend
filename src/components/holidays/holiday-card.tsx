"use client"

import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar, Clock, Edit, MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Holiday } from "@/types"

export default function HolidayCard({ holiday }: { holiday: Holiday }) {
  const formattedDate = holiday.isRecurringYearly
    ? `${holiday.recurringDay} de ${new Intl.DateTimeFormat('es', { month: 'long' }).format(new Date(2000, holiday.recurringMonth! - 1))}`
    : holiday.specificDate
      ? format(parseISO(holiday.specificDate + 'T12:00:00'), "d 'de' MMMM 'de' yyyy", { locale: es })
      : "Fecha no especificada"

  return (
    <Card className="border hover:shadow-sm transition-shadow duration-200">
      <CardHeader className="pb-2 relative">
        <div className="absolute right-4 top-4 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Opciones</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem >
                {holiday.isActive ? "Desactivar" : "Activar"}
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600" >
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-2 flex-wrap">
            <Badge variant="outline">
              {holiday.isActive ? "Activo" : "Inactivo"}
            </Badge>
            {holiday.isRecurringYearly ? (
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Recurrente
              </Badge>
            ) : (
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Específico
              </Badge>
            )}
          </div>
          <CardTitle className="line-clamp-1">{holiday.name}</CardTitle>
          <CardDescription className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">{formattedDate}</span>
          </CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="pt-4">
        <Button
          variant="outline"
          className="w-full"
        >
          <Edit className="h-4 w-4 mr-2" />
          Editar
        </Button>
      </CardFooter>
    </Card>
  )
}