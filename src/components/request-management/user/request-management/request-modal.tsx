import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { Clock, CheckCircle2, XCircle, Calendar, FileText, DollarSign, User, CalendarDays, Ban } from "lucide-react"
import { getRequestState, getRequestType } from "../../request-helpers"
import type { RequestDetails, RequestApproval } from "@/types/request-management/commonTypes"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useCancelRequest } from "@/hooks/request-management/useCancelRequest"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { format, endOfMonth } from "date-fns"
import { es } from "date-fns/locale"

const getRequestIcon = (typeId: number) => {
  switch (typeId) {
    case 1:
      return <Calendar className="h-5 w-5" />
    case 2:
      return <FileText className="h-5 w-5" />
    case 3:
      return <DollarSign className="h-5 w-5" />
    default:
      return <Clock className="h-5 w-5" />
  }
}

const getStatusColor = (stateId: number) => {
  switch (stateId) {
    case 1:
      return "bg-golden-dream-500 text-white"
    case 2:
      return "bg-apple-500 text-white"
    case 3:
      return "bg-red-500 text-white"
    case 4:
      return "bg-gray-500 text-white line-through"
    default:
      return "bg-gray-500 text-white"
  }
}

const getQuincenaLabel = (dateStr?: string) => {
  if (!dateStr) return "No especificada";
  const date = new Date(dateStr);
  return date.getDate() <= 15
    ? `1-15 ${format(date, "MMMM yyyy", { locale: es })}`
    : `16-${format(endOfMonth(date), "d")} ${format(date, "MMMM yyyy", { locale: es })}`;
}

interface Request {
  RequestApprovals: RequestApproval[]
}

interface Props {
  request: Request
}

const RequestModal = ({
  request,
  isOpen,
  onClose,
}: {
  request: RequestDetails | null
  isOpen: boolean
  onClose: () => void
}) => {
  const [cancelReason, setCancelReason] = useState("")
  const { mutation, isDialogOpen, setIsDialogOpen } = useCancelRequest({
    onSuccess: onClose,
  })

  if (!request) return null

  const handleCancel = () => {
    if (cancelReason.trim()) {
      mutation.mutate({ id: request.id, reason: cancelReason })
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[700px] pt-10">
          <DialogHeader className="mb-4">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                {getRequestIcon(request.RequestTypeId)}
                Solicitud #{request.id}
              </DialogTitle>
              <Badge className={`${getStatusColor(request.RequestStateId)} px-3 py-1`}>
                {getRequestState(request.RequestStateId)}
              </Badge>
            </div>
            <p className="text-gray-500 mt-1 font-medium">{getRequestType(request.RequestTypeId)}</p>
          </DialogHeader>

          <ScrollArea className="max-h-[75vh] pr-4">
            <div className="space-y-6">
              <Card className="border-0 shadow-sm bg-gray-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-gray-500" />
                    Detalles de la Solicitud
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-sm text-gray-500">Fecha de Solicitud</span>
                      <p className="font-medium">{formatDate(request.date)}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm text-gray-500">ID de Empleado</span>
                      <p className="font-medium">{request.EmployeeId}</p>
                    </div>

                    {request.RequestTypeId === 1 && request.RequestVacation && (
                      <>
                        <div className="space-y-1">
                          <span className="text-sm text-gray-500">Días solicitados</span>
                          <p className="font-medium">{request.RequestVacation.daysRequested}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-sm text-gray-500">Fecha de Salida</span>
                          <p className="font-medium">{formatDate(request.RequestVacation.departureDate)}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-sm text-gray-500">Fecha de Regreso</span>
                          <p className="font-medium">{formatDate(request.RequestVacation.entryDate)}</p>
                        </div>
                      </>
                    )}

                    {request.RequestTypeId === 2 && request.RequestSalaryCertificate && (
                      <>
                        <div className="col-span-1 sm:col-span-2 mt-2">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <span className="text-sm text-gray-500">Quincena Solicitada</span>
                              <p className="font-medium">
                                {getQuincenaLabel(request.RequestSalaryCertificate.date)}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <span className="text-sm text-gray-500">Razón</span>
                              <p className="font-medium">{request.RequestSalaryCertificate.reason}</p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {request.RequestTypeId === 3 && request.RequestPaymentConfirmation && (
                      <>
                        <div className="col-span-1 sm:col-span-2 mt-2">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <span className="text-sm text-gray-500">Quincena Solicitada</span>
                              <p className="font-medium">
                                {getQuincenaLabel(request.RequestPaymentConfirmation.date)}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <span className="text-sm text-gray-500">Razón</span>
                              <p className="font-medium">{request.RequestPaymentConfirmation.reason}</p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div>
                <h3 className="text-base font-medium flex items-center gap-2 mb-4">
                  <User className="h-4 w-4 text-gray-500" />
                  Proceso de Aprobación
                </h3>
                <div className="space-y-3">
                  {request.RequestApprovals.sort((a, b) => a.processNumber - b.processNumber).map((approval) => (
                    <Card
                      key={approval.id}
                      className={`border ${approval.current ? "border-blue-200 bg-blue-50/30" : "border-gray-200"} shadow-sm`}
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Nivel {approval.processNumber}</span>
                            {approval.current && (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                Actual
                              </Badge>
                            )}
                          </div>
                          <div>
                            {approval.approved === true && (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                <CheckCircle2 className="mr-1 h-3 w-3" /> Aprobado
                              </Badge>
                            )}
                            {approval.approved === false && (
                              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                <XCircle className="mr-1 h-3 w-3" /> Rechazado
                              </Badge>
                            )}
                            {approval.approved === null && request.RequestStateId !== 4 && (
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                <Clock className="mr-1 h-3 w-3" /> Pendiente
                              </Badge>
                            )}
                            {request.RequestStateId === 4 && (
                              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                                <Ban className="mr-1 h-3 w-3" /> Cancelada
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="grid gap-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm">
                            <div className="space-y-1">
                              <span className="text-xs text-gray-500">Aprobador</span>
                              <p className="font-medium">
                                {approval.approver
                                  ? `${approval.approver.Name} ${approval.approver.Surname1} ${approval.approver.Surname2}`
                                  : "No asignado"}
                              </p>
                            </div>

                            <div className="space-y-1">
                              <span className="text-xs text-gray-500">Correo</span>
                              <p className="font-medium">{approval.approver?.Email || "N/A"}</p>
                            </div>

                            {approval.ApprovedDate && (
                              <div className="space-y-1">
                                <span className="text-xs text-gray-500">Fecha de Respuesta</span>
                                <p className="font-medium">{formatDate(approval.ApprovedDate)}</p>
                              </div>
                            )}
                          </div>

                          {approval.observation && (
                            <div className="mt-1 p-3 bg-white rounded-md border border-gray-100">
                              <span className="text-xs text-gray-500 block mb-1">Observación</span>
                              <p className="text-sm">{approval.observation}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {request.RequestStateId === 1 && (
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="destructive"
                    onClick={() => setIsDialogOpen(true)}
                    className="flex items-center gap-2"
                  >
                    <Ban className="h-4 w-4" />
                    Cancelar Solicitud
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro de cancelar esta solicitud?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. La solicitud quedará cancelada permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-4">
            <Textarea
              placeholder="Ingresa el motivo de la cancelación"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCancelReason("")}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancel}
              disabled={!cancelReason.trim()}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Confirmar Cancelación
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default RequestModal
