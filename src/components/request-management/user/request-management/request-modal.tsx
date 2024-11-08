import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { formatDate } from '@/lib/utils'
import { Clock, CheckCircle2, XCircle, Calendar, FileText, DollarSign } from 'lucide-react'
import { getRequestState, getRequestType } from '../../request-helpers'
import { RequestDetails } from '@/types/request-management/commonTypes'

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
      return 'bg-amber-500 text-white'
    case 2:
      return 'bg-green-500 text-white'
    case 3:
      return 'bg-red-500 text-white'
    default:
      return 'bg-gray-500 text-white'
  }
}

interface RequestApproval {
  processNumber: number;
  // Add other properties of RequestApproval here
}

interface Request {
  RequestApprovals: RequestApproval[];
}

interface Props {
  request: Request;
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
  if (!request) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold flex items-center gap-2">
            {getRequestIcon(request.RequestTypeId)}
            Solicitud #{request.id}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh] pr-4">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">{getRequestType(request.RequestTypeId)}</span>
              <Badge className={`${getStatusColor(request.RequestStateId)}`}>
                {getRequestState(request.RequestStateId)}
              </Badge>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Detalles de la Solicitud</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-medium text-gray-500">Fecha de Solicitud:</span>
                  <p>{formatDate(request.date)}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-500">ID de Empleado:</span>
                  <p>{request.EmployeeId}</p>
                </div>

                {request.RequestTypeId === 1 && request.RequestVacation && (
                  <>
                    <div>
                      <span className="font-medium text-gray-500">Días solicitados:</span>
                      <p>{request.RequestVacation.daysRequested}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Fecha de Salida:</span>
                      <p>{formatDate(request.RequestVacation.departureDate)}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Fecha de Regreso:</span>
                      <p>{formatDate(request.RequestVacation.entryDate)}</p>
                    </div>
                  </>
                )}

                {request.RequestTypeId === 2 && request.RequestSalaryCertificate && (
                  <div className="col-span-2">
                    <span className="font-medium text-gray-500">Razón:</span>
                    <p>{request.RequestSalaryCertificate.reason}</p>
                  </div>
                )}

                {request.RequestTypeId === 3 && request.RequestPaymentConfirmation && (
                  <div className="col-span-2">
                    <span className="font-medium text-gray-500">Razón:</span>
                    <p>{request.RequestPaymentConfirmation.reason}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div>
              <h3 className="text-lg font-semibold mb-4">Proceso de Aprobación</h3>
              <div className="space-y-4">
                {request.RequestApprovals.sort((a: { processNumber: number }, b: { processNumber: number }) => a.processNumber - b.processNumber).map((approval: { id: React.Key | null | undefined; processNumber: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; approved: boolean | null; approverId: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; Name: any; Surname1: any; Surname2: any; ApprovedDate: string; observation: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined }) => (
                  <Card key={approval.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-medium">Proceso {approval.processNumber}</span>
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
                        {approval.approved === null && (
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                            <Clock className="mr-1 h-3 w-3" /> Pendiente
                          </Badge>
                        )}
                      </div>
                      {approval.approverId && (
                        <>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <span className="text-gray-500">ID del Aprobador:</span>
                            <span>{approval.approverId}</span>
                            <span className="text-gray-500">Nombre:</span>
                            <span>{`${approval.Name} ${approval.Surname1} ${approval.Surname2}` || 'N/A'}</span>
                          </div>
                          <Separator className="my-2" />
                        </>
                      )}
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {approval.ApprovedDate && (
                          <>
                            <span className="text-gray-500">Fecha de Aprobación:</span>
                            <span>{formatDate(approval.ApprovedDate)}</span>
                          </>
                        )}
                        {approval.observation && (
                          <>
                            <span className="text-gray-500">Observación:</span>
                            <span>{approval.observation}</span>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default RequestModal