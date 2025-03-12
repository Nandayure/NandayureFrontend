import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Calendar, FileText, DollarSign, Upload } from 'lucide-react';
import { Badge } from '../../../ui/badge';
import { formatDate } from '@/lib/utils';
import { getRequestState, getRequestType } from '../../request-helpers';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from 'react';

interface RequestApproval {
  id: Key | null | undefined;
  processNumber: string;
  approverId?: string;
  Name?: string;
  Surname1?: string;
  Surname2?: string;
  approved: boolean | null;
  ApprovedDate?: string;
  observation?: string;
}

const RequestModal = ({
  request,
  isOpen,
  onClose,
}: {
  request: any
  isOpen: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();

  // Verificar si todas las aprobaciones están completadas (aprobadas)
  const allApprovalsCompleted = request?.RequestApprovals?.length > 0 &&
    request.RequestApprovals.every((approval: any) => approval.approved === true);

  // Función para navegar a la página de gestión documental
  const handleNavigateToDocuments = () => {
    router.push(`/document-management/digital-files/${request.EmployeeId}`);
    onClose(); // Cerrar el modal después de navegar
  };

  if (!request) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalles de la solicitud</DialogTitle>
          <DialogDescription>
            ID de solicitud: {request.id} | Cédula de empleado: {request.EmployeeId} |
            Nombre: {request.Employee?.Name} {request.Employee?.Surname1}{' '}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <div className="flex items-center gap-2">
              {request.RequestTypeId === 1 && <Calendar className="h-4 w-4" />}
              {request.RequestTypeId === 2 && <FileText className="h-4 w-4" />}
              {request.RequestTypeId === 3 && (
                <DollarSign className="h-4 w-4" />
              )}
              <span className="font-semibold">Tipo de solicitud:</span>
            </div>
            <span>{getRequestType(request.RequestTypeId)}</span>
            <span className="font-semibold">Fecha de solicitud:</span>
            <span>{formatDate(request.date)}</span>
            <span className="font-semibold">Estado:</span>
            <Badge
              variant={
                request.RequestStateId === 2
                  ? 'approving'
                  : request.RequestStateId === 3
                    ? 'rejecting'
                    : 'pending'
              }
              className="w-24 flex items-center justify-center"
            >
              {getRequestState(request.RequestStateId)}
            </Badge>
          </div>

          {request.RequestTypeId === 1 && request.RequestVacation && (
            <div className="grid grid-cols-2 items-center gap-4">
              <span className="font-semibold">Días solicitados:</span>
              <span>{request.RequestVacation.daysRequested}</span>
              <span className="font-semibold">Fecha de salida:</span>
              <span>{formatDate(request.RequestVacation.departureDate)}</span>
              <span className="font-semibold">Fecha de regreso:</span>
              <span>{formatDate(request.RequestVacation.entryDate)}</span>
            </div>
          )}

          {request.RequestTypeId === 2 && request.RequestSalaryCertificate && (
            <div className="grid grid-cols-2 items-center gap-4">
              <span className="font-semibold">Razón:</span>
              <span>{request.RequestSalaryCertificate.reason}</span>
            </div>
          )}

          {request.RequestTypeId === 3 &&
            request.RequestPaymentConfirmation && (
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="font-semibold">Razón:</span>
                <span>{request.RequestPaymentConfirmation.reason}</span>
              </div>
            )}

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Proceso de aprobación</h3>
            {request.RequestApprovals.map((approval: RequestApproval) => (
              <div key={approval.id} className="rounded-md border p-4">
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-semibold">Número de proceso:</span>
                  <span>{approval.processNumber}</span>
                  {approval.approverId && (
                    <>
                      <span className="font-semibold">Cédula del aprobador:</span>
                      <span>{approval.approverId}</span>
                      <span className="font-semibold">
                        Nombre del aprobador:
                      </span>
                      <span>
                        {approval.Name} {approval.Surname1} {approval.Surname2}
                      </span>
                    </>
                  )}
                  <span className="font-semibold">Estado:</span>
                  <Badge
                    variant={
                      approval.approved
                        ? 'approving'
                        : approval.approved === false
                          ? 'rejecting'
                          : 'pending'
                    }
                    className="w-24 flex items-center justify-center"
                  >
                    {approval.approved
                      ? 'Aprobado'
                      : approval.approved === false
                        ? 'Rechazado'
                        : 'Pendiente'}
                  </Badge>
                  {approval.ApprovedDate && (
                    <>
                      <span className="font-semibold">
                        Fecha de aprobación:
                      </span>
                      <span>{formatDate(approval.ApprovedDate)}</span>
                    </>
                  )}
                  {approval.observation && (
                    <>
                      <span className="font-semibold">Observación:</span>
                      <span>{approval.observation}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Botón para subir documentos (visible solo cuando todas las aprobaciones están completadas) */}
          {allApprovalsCompleted && request.RequestStateId === 2 && (
            <div className="flex justify-end mt-4">
              <Button
                onClick={handleNavigateToDocuments}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Gestionar Documentos
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestModal;
