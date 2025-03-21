"use client"
import { Calendar, FileText, DollarSign, Clock, CheckCircle, XCircle, Inbox } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useGetCurrentToApprove } from "@/hooks"
import usePatchRequestApproval from "@/hooks/request-management/usePatchRequestApproval"
import { formatDate } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function InboxComponent() {
  const { currentToApprove, isLoading } = useGetCurrentToApprove()
  const { register, handleSubmit, isModalOpen, setIsModalOpen, selectedRequest, onSubmit, handleRequestClick } =
    usePatchRequestApproval()

  // Función para obtener iniciales del nombre
  const getInitials = (name = "", surname1 = "") => {
    return `${name.charAt(0)}${surname1.charAt(0)}`.toUpperCase()
  }

  // Función para obtener el icono según el tipo de solicitud
  const getRequestTypeIcon = (requestTypeId: number) => {
    switch (requestTypeId) {
      case 1:
        return <Calendar className="h-6 w-6" />
      case 2:
        return <FileText className="h-6 w-6" />
      case 3:
        return <DollarSign className="h-6 w-6" />
      default:
        return <Clock className="h-6 w-6" />
    }
  }

  // Función para obtener el color del estado
  const getStatusColor = (stateId: number) => {
    switch (stateId) {
      case 1:
        return "bg-golden-dream-500 text-white"
      case 2:
        return "bg-apple-500 text-white"
      case 3:
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  // Función para formatear fecha en formato legible
  const formatDateString = (dateString: string) => {
    if (!dateString) return "N/A"
    return formatDate(dateString)
  }

  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="relative bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 focus:outline-hidden transition-colors"
                  aria-label="Bandeja de solicitudes pendientes"
                >
                  <Inbox className="h-5 w-5" />
                  {Array.isArray(currentToApprove) && currentToApprove.length > 0 && (
                    <>
                      <Badge
                        className="absolute -top-2 -right-2 px-2 py-1 bg-dodger-blue-500 hover:bg-dodger-blue-800 text-white rounded-full text-xs animate-ping"
                        aria-label={`${currentToApprove.length} solicitudes pendientes`}
                      >
                        0
                      </Badge>
                      <Badge
                        className="absolute -top-2 -right-2 px-2 py-1 bg-dodger-blue-500 hover:bg-dodger-blue-800 text-white rounded-full text-xs"
                        aria-label={`${currentToApprove.length} solicitudes pendientes`}
                      >
                        {currentToApprove.length}
                      </Badge>
                    </>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-96 p-0 shadow-lg border-0 rounded-lg overflow-hidden" align="end">
                <div className="bg-gray-50 p-4 border-b">
                  <h3 className="font-medium text-gray-800">
                    Solicitudes pendientes ({Array.isArray(currentToApprove) ? currentToApprove.length : 0})
                  </h3>
                </div>
                <div className="max-h-[350px] overflow-y-auto p-2">
                  {isLoading ? (
                    <div className="space-y-3 p-2">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <SkeletonCard key={index} />
                      ))}
                    </div>
                  ) : Array.isArray(currentToApprove) && currentToApprove.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                      <Inbox className="h-12 w-12 mb-2 opacity-30" />
                      <p>No hay solicitudes pendientes</p>
                    </div>
                  ) : (
                    Array.isArray(currentToApprove) &&
                    currentToApprove.map((request) => (
                      <Card
                        key={request.id}
                        className="mb-2 cursor-pointer hover:shadow-md transition-shadow duration-300"
                        onClick={() => handleRequestClick(request)}
                      >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">{request.Request.RequestType.name}</CardTitle>
                          <Badge
                            className={`${getStatusColor(request.Request.RequestStateId)} text-xs font-semibold px-2 py-1 rounded-full`}
                          >
                            Pendiente
                          </Badge>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex items-center space-x-4">
                            {getRequestTypeIcon(request.Request.RequestTypeId)}
                            <div>
                              <p className="text-sm text-gray-500">
                                Fecha: <span className="font-medium">{formatDateString(request.Request.date)}</span>
                              </p>
                              <p className="text-sm text-gray-500">
                                Solicitante:{" "}
                                <span className="font-medium">
                                  {request.Request.Employee.Name} {request.Request.Employee.Surname1}
                                </span>
                              </p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <p className="text-xs text-gray-400">Haga clic para ver detalles</p>
                        </CardFooter>
                      </Card>
                    ))
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </TooltipTrigger>
          <TooltipContent>Bandeja de solicitudes</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-xl flex items-center gap-2">
              {selectedRequest && (
                <>
                  <span className="p-2 rounded-full bg-gray-100">
                    {getRequestTypeIcon(selectedRequest.Request.RequestTypeId)}
                  </span>
                  {selectedRequest.Request.RequestType.name} #{selectedRequest.processNumber}
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <form onSubmit={handleSubmit((data) => onSubmit({ ...data, reason: data.reason || "" }, "approve"))}>
              <div className="p-6 pt-2">
                <div className="flex items-center mb-6">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarFallback>
                      {getInitials(selectedRequest.Request.Employee?.Name, selectedRequest.Request.Employee?.Surname1)}
                    </AvatarFallback>
                    <AvatarImage
                      src={`/api/employee/${selectedRequest.Request.EmployeeId}/avatar`}
                      alt={`${selectedRequest.Request.Employee?.Name} ${selectedRequest.Request.Employee?.Surname1}`}
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">
                      {selectedRequest.Request.Employee?.Name} {selectedRequest.Request.Employee?.Surname1}{" "}
                      {selectedRequest.Request.Employee?.Surname2}
                    </h4>
                    <p className="text-sm text-gray-500">{selectedRequest.Request.EmployeeId}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Detalles de la solicitud</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedRequest.Request.RequestTypeId === 1 && selectedRequest.Request.RequestVacation && (
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-gray-500">Días solicitados</p>
                            <p className="font-medium">{selectedRequest.Request.RequestVacation.daysRequested}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Fecha salida</p>
                            <p className="font-medium">
                              {formatDateString(selectedRequest.Request.RequestVacation.departureDate)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Fecha regreso</p>
                            <p className="font-medium">
                              {formatDateString(selectedRequest.Request.RequestVacation.entryDate)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Días disponibles</p>
                            <p className="font-medium">{selectedRequest.Request.Employee.AvailableVacationDays}</p>
                          </div>
                        </div>
                      )}

                      {selectedRequest.Request.RequestTypeId === 2 &&
                        selectedRequest.Request.RequestSalaryCertificate && (
                          <div>
                            <p className="text-gray-500">Razón</p>
                            <p className="font-medium">{selectedRequest.Request.RequestSalaryCertificate.reason}</p>
                          </div>
                        )}

                      {selectedRequest.Request.RequestTypeId === 3 &&
                        selectedRequest.Request.RequestPaymentConfirmation && (
                          <div>
                            <p className="text-gray-500">Razón</p>
                            <p className="font-medium">{selectedRequest.Request.RequestPaymentConfirmation.reason}</p>
                          </div>
                        )}
                    </CardContent>
                  </Card>

                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium mb-2">
                      Razón de aprobación/rechazo
                    </label>
                    <Textarea
                      id="reason"
                      placeholder="Ingrese la razón de su decisión"
                      className="w-full resize-none"
                      rows={3}
                      {...register("reason")}
                    />
                  </div>
                </div>
              </div>

              <DialogFooter className="p-4 bg-gray-50 border-t gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSubmit((data) => onSubmit({ ...data, reason: data.reason || "" }, "reject"))}
                  className="gap-2"
                >
                  Rechazar
                </Button>
                <Button type="submit">
                  Aprobar
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

const SkeletonCard = () => (
  <Card className="animate-pulse mb-2">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <div className="bg-gray-300 h-5 w-2/3 rounded"></div>
      <div className="bg-gray-300 h-5 w-16 rounded-full"></div>
    </CardHeader>
    <CardContent className="pb-2">
      <div className="flex items-center space-x-4">
        <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
        <div className="space-y-2">
          <div className="bg-gray-300 h-4 w-32 rounded"></div>
          <div className="bg-gray-300 h-4 w-24 rounded"></div>
        </div>
      </div>
    </CardContent>
    <CardFooter className="pt-0">
      <div className="bg-gray-300 h-3 w-36 rounded"></div>
    </CardFooter>
  </Card>
)

