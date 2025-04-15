import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '../../../ui/badge';
import { formatDate } from '@/lib/utils';
import { getRequestType } from '../../request-helpers';
import SkeletonLoader from '@/components/ui/skeleton-loader';
import { RequestDetails } from '@/types/request-management/commonTypes';
import { Employee } from '@/types';

const RequestTable = ({
  requests,
  isLoading,
  onRowClick,
  employees,
}: {
  employees: Employee[];
  requests: RequestDetails[];
  isLoading: boolean;
  onRowClick: (request: RequestDetails) => void;
}) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>ID de solicitud</TableHead>
        <TableHead>Cédula de empleado</TableHead>
        <TableHead>Nombre de empleado</TableHead>
        <TableHead>Apellidos</TableHead>
        <TableHead>Tipo de solicitud</TableHead>
        <TableHead>Fecha de solicitud</TableHead>
        <TableHead>Estado</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {isLoading ? (
        <TableRow>
          <TableCell colSpan={7}>
            <SkeletonLoader />
          </TableCell>
        </TableRow>
      ) : requests?.length === 0 ? (
        <TableRow>
          <TableCell colSpan={7} className="text-center">
            No hay solicitudes disponibles
          </TableCell>
        </TableRow>
      ) : (
        requests?.map((request) => (
          <TableRow
            key={request.id}
            onClick={() => onRowClick(request)}
            className="cursor-pointer hover:bg-muted"
          >
            <TableCell>{request.id}</TableCell>
            <TableCell>{request.EmployeeId}</TableCell>
            <TableCell>{request.EmployeeId && employees.find((e) => e.id === request.EmployeeId)?.Name}</TableCell>
            <TableCell>{`${request.EmployeeId && employees.find((e) => e.id === request.EmployeeId)?.Surname1} ${request.EmployeeId && employees.find((e) => e.id === request.EmployeeId)?.Surname2}`}</TableCell>
            <TableCell>{request.RequestType.name}</TableCell>
            <TableCell>{formatDate(request.date)}</TableCell>
            <TableCell>
              <Badge
                variant={
                  request.RequestStateId === 4
                    ? 'outline'
                    : request.RequestStatus.id === 2
                      ? 'approving'
                      : request.RequestStatus.id === 3
                        ? 'rejecting'
                        : 'pending'
                }
                className={request.RequestStateId === 4 ? 'bg-gray-50 text-gray-700 border-gray-200' : ''}
              >
                {request.RequestStatus.Name}
              </Badge>
            </TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  </Table>
);

export default RequestTable;
