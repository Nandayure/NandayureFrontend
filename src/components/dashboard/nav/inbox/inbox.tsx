'use client';

import { Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useGetCurrentToApprove } from '@/hooks';
import usePatchRequestApproval from '@/hooks/request-management/usePatchRequestApproval';
import SkeletonLoader from '@/components/ui/skeleton-loader';
import { formatDate } from '@/lib/utils';

export default function InboxComponent() {
  const { currentToApprove, isLoading } = useGetCurrentToApprove();
  const {
    register,
    handleSubmit,
    isModalOpen,
    setIsModalOpen,
    selectedRequest,
    onSubmit,
    handleRequestClick,
  } = usePatchRequestApproval();

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button className="relative bg-transparent text-black hover:bg-gray-100 focus:outline-none">
            <Inbox className="h-5 w-5" />
            {Array.isArray(currentToApprove) && currentToApprove.length > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 px-2 py-1"
              >
                {currentToApprove.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 mr-4">
          <div className="space-y-2">
            <h3 className="font-medium">
              Solicitudes pendientes (
              {Array.isArray(currentToApprove) ? currentToApprove.length : 0})
            </h3>
            {isLoading ? (
              <>
                <SkeletonLoader className="h-6 w-full mb-2" />
                <SkeletonLoader className="h-6 w-full mb-2" />
                <SkeletonLoader className="h-6 w-full mb-2" />
              </>
            ) : Array.isArray(currentToApprove) &&
              currentToApprove.length === 0 ? (
              <p>No hay solicitudes pendientes</p>
            ) : (
              Array.isArray(currentToApprove) &&
              currentToApprove.map((request) => (
                <div
                  key={request.id}
                  className="flex flex-col p-2 hover:bg-gray-100 rounded cursor-pointer"
                  onClick={() => handleRequestClick(request)}
                >
                  <div className="mb-2">
                    <p className="font-medium">
                      Solicitud de {request.Request.RequestType.name}
                    </p>
                  </div>
                  <div className="text-sm text-gray-700">
                    <p>
                      <span className="font-medium">Solicitante:</span>{' '}
                      {request.requesterId}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </PopoverContent>
      </Popover>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Aprobación de Proceso {selectedRequest?.processNumber}
            </DialogTitle>
            <span>Información de la solicitud</span>

            {selectedRequest?.Request.RequestType.id === 1 &&
              selectedRequest?.Request.RequestType.id && (
                <div className="text-sm text-gray-700">
                  <p>
                    <span className="font-medium">Días solicitados:</span>{' '}
                    {selectedRequest.Request.RequestVacation?.daysRequested}
                  </p>
                  <p>
                    <span className="font-medium">Fecha salida:</span>{' '}
                    {formatDate(
                      selectedRequest.Request.RequestVacation?.departureDate ??
                        '',
                    )}
                  </p>
                  <p>
                    <span className="font-medium">Fecha entrada:</span>{' '}
                    {formatDate(
                      selectedRequest.Request.RequestVacation?.entryDate ?? '',
                    )}
                  </p>
                </div>
              )}

            {selectedRequest?.Request.RequestType.id === 2 &&
              selectedRequest?.Request.RequestType.id && (
                <div className="text-sm text-gray-700">
                  <p>
                    <span className="font-medium">Razón:</span>{' '}
                    {selectedRequest.Request.RequestSalaryCertificate?.reason}
                  </p>
                </div>
              )}

            {selectedRequest?.Request.RequestType.id === 3 &&
              selectedRequest?.Request.RequestType.id && (
                <div className="text-sm text-gray-700">
                  <p>
                    <span className="font-medium">Razón:</span>{' '}
                    {selectedRequest.Request.RequestPaymentConfirmation?.reason}
                  </p>
                </div>
              )}
              
          </DialogHeader>
          {/* Use 'handleSubmit' from react-hook-form */}
          <form>
            <div className="space-y-4">
              {/* Connect the Textarea to react-hook-form */}
              <Textarea
                placeholder="Razón"
                {...register('reason')}
              />
              <div className="text-sm text-gray-700">
                <p>
                  <span className="font-medium">Solicitante:</span>{' '}
                  {selectedRequest?.requesterId}
                </p>
                <p>
                  <span className="font-medium">Aprobador:</span>{' '}
                  {selectedRequest?.approverId}
                </p>
                
              </div>
            </div>
            <DialogFooter>
              {/* Handle form submission with the specified action */}
              <Button
                variant="outline"
                onClick={handleSubmit((data) =>
                  onSubmit({ ...data, reason: data.reason || '' }, 'reject'),
                )}
              >
                Rechazar
              </Button>
              <Button
                onClick={handleSubmit((data) =>
                  onSubmit({ ...data, reason: data.reason || '' }, 'approve'),
                )}
              >
                Aprobar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
} 