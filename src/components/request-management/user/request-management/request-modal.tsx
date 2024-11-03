import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { formatDate } from '@/lib/utils';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';
import { getRequestState, getRequestType } from '../../request-helpers';
import { RequestDetails } from '@/types/request-management/commonTypes';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from 'react';

const RequestModal = ({
  request,
  isOpen,
  onClose,
}: {
  request: RequestDetails | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!request) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalles de la Solicitud #{request.id}</DialogTitle>
          <DialogDescription>
            Tipo: {getRequestType(request.RequestTypeId)} | Estado:{' '}
            {getRequestState(request.RequestStateId)}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Fecha de Solicitud:</span>
            <span>{formatDate(request.date)}</span>
            <span className="font-semibold">ID de Empleado:</span>
            <span>{request.EmployeeId}</span>
          </div>

          {request.RequestTypeId === 1 && request.RequestVacation && (
            <div className="grid grid-cols-2 items-center gap-4">
              <span className="font-semibold">Días solicitados:</span>
              <span>{request.RequestVacation.daysRequested}</span>
              <span className="font-semibold">Fecha de Salida:</span>
              <span>{formatDate(request.RequestVacation.departureDate)}</span>
              <span className="font-semibold">Fecha de Regreso:</span>
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
            <h3 className="text-lg font-semibold">Proceso de Aprobación</h3>
            {request.RequestApprovals.sort(
              (a: { processNumber: number; }, b: { processNumber: number; }) => a.processNumber - b.processNumber,
            ).map((approval: { id: Key | null | undefined; processNumber: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; approved: boolean | null; approverId: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; Name: any; Surname1: any; Surname2: any; ApprovedDate: string; observation: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }) => (
              <Card key={approval.id} className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">
                    Proceso {approval.processNumber}
                  </span>
                  {approval.approved === true && (
                    <CheckCircle2 className="text-green-500 h-5 w-5" />
                  )}
                  {approval.approved === false && (
                    <XCircle className="text-red-500 h-5 w-5" />
                  )}
                  {approval.approved === null && (
                    <Clock className="text-yellow-500 h-5 w-5" />
                  )}
                </div>
                <div className="mt-2 text-sm">
                  {approval.approverId && (
                    <>
                      <p>
                        <span className="font-semibold">ID del Aprobador:</span>{' '}
                        {approval.approverId}
                      </p>
                      <p>
                        <span className="font-semibold">Nombre:</span>{' '}
                        {`${approval.Name} ${approval.Surname1} ${approval.Surname2}` ||
                          'N/A'}
                      </p>
                    </>
                  )}
                  {approval.ApprovedDate && (
                    <p>
                      <span className="font-semibold">
                        Fecha de Aprobación:
                      </span>{' '}
                      {formatDate(approval.ApprovedDate)}
                    </p>
                  )}
                  {approval.observation && (
                    <p>
                      <span className="font-semibold">Observación:</span>{' '}
                      {approval.observation}
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestModal;
