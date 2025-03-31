"use client"

import { useState } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar, Clock, Edit, Trash2, MoreHorizontal } from "lucide-react"
import { useUpdateHolidayStatus } from "@/hooks/holiday/commands/useUpdateHolidayStatus"
import { useDeleteHoliday } from "@/hooks/holiday/commands/useDeleteHoliday"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { HolidayDeleteDialog } from "./holiday-delete-dialog"
import { cn } from "@/lib/utils"
import { Holiday } from "@/types"

interface HolidayCardProps {
  holiday: Holiday
}

export function HolidayCard({ holiday }: HolidayCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false)
  const { isOpen: showDeleteDialog, setIsOpen: setShowDeleteDialog } = useDeleteHoliday({ holiday })
  const { toggleStatus, isPending: isStatusUpdating } = useUpdateHolidayStatus({ holiday })
  const [isHovered, setIsHovered] = useState(false)

  const formattedDate = format(new Date(holiday.date), "d 'de' MMMM 'de' yyyy", { locale: es })
  const isPast = new Date(holiday.date) < new Date()
  const isUpcoming = !isPast && new Date(holiday.date) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 días

  return (
    <>
      <Card
        className={cn(
          "overflow-hidden transition-all duration-200 border-2",
          isHovered ? "shadow-lg translate-y-[-4px]" : "shadow-sm",
          holiday.isActive
            ? isPast
              ? "border-muted"
              : isUpcoming
                ? "border-primary/20"
                : "border-transparent"
            : "border-muted/50 bg-muted/5",
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="pb-2 relative">
          <div className="absolute right-4 top-4 z-10">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 rounded-full transition-opacity",
                    isHovered ? "opacity-100" : "opacity-0 sm:opacity-100",
                  )}
                  aria-label="Opciones del día feriado"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 animate-in slide-in-top">
                <DropdownMenuItem
                  onClick={() => setShowEditDialog(true)}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  <span>Editar</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={toggleStatus}
                  disabled={isStatusUpdating}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  <span>{holiday.isActive ? "Desactivar" : "Activar"}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setShowDeleteDialog(true)}
                  className="cursor-pointer text-destructive focus:text-destructive flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Eliminar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-start gap-2">
              <Badge
                variant={holiday.isActive ? "default" : "secondary"}
                className={cn(
                  "transition-all",
                  holiday.isActive
                    ? isPast
                      ? "bg-muted text-muted-foreground"
                      : isUpcoming
                        ? "bg-primary/90 text-primary-foreground"
                        : ""
                    : "",
                )}
              >
                {holiday.isActive ? "Activo" : "Inactivo"}
              </Badge>
              {isUpcoming && holiday.isActive && (
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  Próximo
                </Badge>
              )}
            </div>
            <CardTitle className="line-clamp-1 mt-2">{holiday.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="truncate">{formattedDate}</span>
              {isPast && <span className="text-xs text-muted-foreground whitespace-nowrap">(Pasado)</span>}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="flex flex-wrap gap-2 text-sm">
            {holiday.isRecurringYearly && (
              <Badge variant="outline" className="flex items-center gap-1 bg-secondary/50">
                <Clock className="h-3 w-3" />
                Recurrente Anual
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <Button
            variant="outline"
            className={cn(
              "w-full transition-all duration-200 relative overflow-hidden group",
              isHovered ? "bg-primary/5 border-primary/30" : "",
            )}
            onClick={() => setShowEditDialog(true)}
          >
            <span className="absolute inset-0 w-0 bg-primary/10 transition-all duration-300 ease-out group-hover:w-full"></span>
            <span className="relative flex items-center justify-center gap-2">
              <Edit className="h-4 w-4" />
              Editar
            </span>
          </Button>
        </CardFooter>
      </Card>

      <HolidayDeleteDialog holiday={holiday} />
    </>
  )
}

