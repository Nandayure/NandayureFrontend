'use client'

import { Inbox } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { useGetCurrentToApprove } from '@/hooks'
import usePatchRequestApproval from '@/hooks/request-management/usePatchRequestApproval'
import { Skeleton } from "@/components/ui/skeleton"
import { formatDate } from '@/lib/utils'
import { ScrollArea } from "@/components/ui/scroll-area"

export default function InboxComponent() {
  const { currentToApprove, isLoading } = useGetCurrentToApprove()
  const {
    register,
    handleSubmit,
    isModalOpen,
    setIsModalOpen,
    selectedRequest,
    onSubmit,
    handleRequestClick,
  } = usePatchRequestApproval()

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full p-0">
            <Inbox className="h-5 w-5" />
            {Array.isArray(currentToApprove) && currentToApprove.length > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 px-2 py-1 text-xs"
              >
                {currentToApprove.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <div className="p-4">
            <h3 className="font-semibold text-sm">
              Solicitudes pendientes ({Array.isArray(currentToApprove) ? currentToApprove.length : 0})
            </h3>
          </div>
          <ScrollArea className="h-[300px]">
            {isLoading ? (
              <div className="p-4 space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : Array.isArray(currentToApprove) && currentToApprove.length === 0 ? (
              <p className="p-4 text-center text-sm text-muted-foreground">No hay solicitudes pendientes</p>
            ) : (
              Array.isArray(currentToApprove) &&
              currentToApprove.map((request) => (
                <div
                  key={request.id}
                  className="p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRequestClick(request)}
                >
                  <p className="font-medium text-sm">
                    Solicitud de {request.Request.RequestType.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Solicitante: {request.requesterId}
                  </p>
                </div>
              ))
            )}
          </ScrollArea>
        </PopoverContent>
      </Popover>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Aprobación de Proceso #{selectedRequest?.processNumber}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit((data) => onSubmit({ ...data, reason: data.reason || '' }, 'approve'))}>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-sm">Información de la solicitud</h4>
                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                  <p className="font-medium text-sm">Tipo: {selectedRequest?.Request.RequestType.name}</p>
                  {selectedRequest?.Request.RequestType.id === 1 && (
                    <>
                      <p className="text-sm">Días solicitados: {selectedRequest.Request.RequestVacation?.daysRequested}</p>
                      <p className="text-sm">Fecha salida: {formatDate(selectedRequest.Request.RequestVacation?.departureDate ?? '')}</p>
                      <p className="text-sm">Fecha entrada: {formatDate(selectedRequest.Request.RequestVacation?.entryDate ?? '')}</p>
                    </>
                  )}
                  {selectedRequest?.Request.RequestType.id === 2 && (
                    <p className="text-sm">Razón: {selectedRequest.Request.RequestSalaryCertificate?.reason}</p>
                  )}
                  {selectedRequest?.Request.RequestType.id === 3 && (
                    <p className="text-sm">Razón: {selectedRequest.Request.RequestPaymentConfirmation?.reason}</p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-sm">Información del solicitante</h4>
                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                  <p className="text-sm">Cédula del empleado: {selectedRequest?.Request.EmployeeId}</p>
                  <p className="text-sm">
                    Nombre del empleado: {selectedRequest?.Request.Employee.Name} {selectedRequest?.Request.Employee.Surname1} {selectedRequest?.Request.Employee.Surname2}
                  </p>
                </div>
              </div>

              <div>
                <label htmlFor="reason" className="block text-sm font-medium mb-2">
                  Razón de aprobación/rechazo
                </label>
                <Textarea
                  id="reason"
                  placeholder="Ingrese la razón de su decisión"
                  className="w-full"
                  {...register('reason')}
                />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={handleSubmit((data) => onSubmit({ ...data, reason: data.reason || '' }, 'reject'))}>
                Rechazar
              </Button>
              <Button type="submit">Aprobar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}