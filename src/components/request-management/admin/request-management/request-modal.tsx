import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import type { RequestDetails } from "@/types/request-management/commonTypes"
import type { Employee } from "@/types"
import { CalendarIcon, ClipboardIcon, UserIcon, ClockIcon } from "lucide-react"

export default function RequestModal({
  request,
  isOpen,
  onClose,
}: {
  request: RequestDetails | null
  isOpen: boolean
  onClose: () => void
}) {
  if (!request) return null


  // Helper function to get status color
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto p-6 pt-10 rounded-lg" hideCloseButton>
        <DialogHeader className="mb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Solicitud #{request.id}</DialogTitle>
            <Badge className={`${getStatusColor(request.RequestStateId)} px-3 py-1`}>
              {request.RequestStatus.Name}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Información básica de la solicitud */}
          <section className="bg-gray-50 p-5 rounded-lg">
            <div className="flex items-center mb-3">
              <ClipboardIcon className="h-5 w-5 mr-2 text-gray-500" />
              <h3 className="text-lg font-medium">Información General</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <span className="text-gray-500 w-32">Tipo:</span>
                <span className="font-medium">{request.RequestType.name}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 w-32">Fecha:</span>
                <span className="font-medium">{formatDate(request.date)}</span>
              </div>
              {request.CancelledReason && (
                <div className="col-span-1 md:col-span-2 mt-2">
                  <span className="text-gray-500 block mb-1">Razón de cancelación:</span>
                  <div className="bg-white p-2 rounded border border-gray-200">{request.CancelledReason}</div>
                </div>
              )}
            </div>
          </section>

          {/* Información del empleado */}
          <section className="bg-gray-50 p-5 rounded-lg">
            <div className="flex items-center mb-3">
              <UserIcon className="h-5 w-5 mr-2 text-gray-500" />
              <h3 className="text-lg font-medium">Información del Solicitante</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <span className="text-gray-500 w-32">Cédula:</span>
                <span className="font-medium">{request.EmployeeId}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 w-32">Nombre:</span>
                <span className="font-medium">{request.Employee.Name}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 w-32">Apellidos:</span>
                <span className="font-medium">{`${request.Employee.Surname1} ${request.Employee.Surname2}`}</span>
              </div>
            </div>
          </section>

          {/* Detalles específicos según el tipo de solicitud */}
          {request.RequestVacation && (
            <section className="bg-gray-50 p-5 rounded-lg">
              <div className="flex items-center mb-3">
                <CalendarIcon className="h-5 w-5 mr-2 text-gray-500" />
                <h3 className="text-lg font-medium">Detalles de Vacaciones</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <span className="text-gray-500 w-32">Días solicitados:</span>
                  <span className="font-medium">{request.RequestVacation.daysRequested}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 w-32">Fecha de salida:</span>
                  <span className="font-medium">{formatDate(request.RequestVacation.departureDate)}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 w-32">Fecha de regreso:</span>
                  <span className="font-medium">{formatDate(request.RequestVacation.entryDate)}</span>
                </div>
              </div>
            </section>
          )}

          {/* Historial de aprobaciones */}
          <section className="bg-gray-50 p-5 rounded-lg">
            <div className="flex items-center mb-3">
              <ClockIcon className="h-5 w-5 mr-2 text-gray-500" />
              <h3 className="text-lg font-medium">Historial de Aprobaciones</h3>
            </div>

            <div className="space-y-3">
              {request.RequestApprovals.map((approval, index) => (
                <div
                  key={approval.id}
                  className={`p-4 rounded-lg border ${approval.current ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-white"}`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-sm">Aprobador</span>
                      <span className="font-medium">
                        {approval.approver.Name} {approval.approver.Surname1} {approval.approver.Surname2}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-sm">Estado</span>
                      <div>
                        <Badge
                          variant="outline"
                          className={`mt-1 ${request.RequestStateId === 4
                            ? "bg-gray-50 text-gray-700 border-gray-200"
                            : approval.approved === true
                              ? "bg-green-50 text-green-700 border-green-200"
                              : approval.approved === false
                                ? "bg-red-50 text-red-700 border-red-200"
                                : "bg-yellow-50 text-yellow-700 border-yellow-200"
                            }`}
                        >
                          {request.RequestStateId === 4
                            ? "Cancelada"
                            : approval.approved === true
                              ? "Aprobado"
                              : approval.approved === false
                                ? "Rechazado"
                                : "Pendiente"}
                        </Badge>
                        {approval.current && (
                          <Badge variant="outline" className="ml-2 bg-blue-50">
                            Actual
                          </Badge>
                        )}
                      </div>
                    </div>

                    {approval.ApprovedDate && (
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-sm">Fecha de respuesta</span>
                        <span className="font-medium">{formatDate(approval.ApprovedDate)}</span>
                      </div>
                    )}

                    {approval.observation && (
                      <div className="col-span-1 md:col-span-2 mt-1">
                        <span className="text-gray-500 text-sm block mb-1">Observación</span>
                        <div className="bg-gray-50 p-2 rounded text-sm">{approval.observation}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}
