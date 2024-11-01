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
import { getRequestState, getRequestType } from '../../request-helpers';
import SkeletonLoader from '@/components/ui/skeleton-loader';
import { RequestDetails } from '@/types/request-management/commonTypes';

const RequestTable = ({
  requests,
  isLoading,
  onRowClick,
}: {
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
      {isLoading
        ? Array.from({ length: 3 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <SkeletonLoader className="h-4 w-full" />
              </TableCell>
              <TableCell>
                <SkeletonLoader className="h-4 w-full" />
              </TableCell>
              <TableCell>
                <SkeletonLoader className="h-4 w-full" />
              </TableCell>
              <TableCell>
                <SkeletonLoader className="h-4 w-full" />
              </TableCell>
              <TableCell>
                <SkeletonLoader className="h-4 w-full" />
              </TableCell>
              <TableCell>
                <SkeletonLoader className="h-4 w-full" />
              </TableCell>
              <TableCell>
                <SkeletonLoader className="h-4 w-full" />
              </TableCell>
            </TableRow>
          ))
        : requests.map((request) => (
            <TableRow
              key={request.id}
              onClick={() => onRowClick(request)}
              className="cursor-pointer hover:bg-muted"
            >
              <TableCell>{request.id}</TableCell>
              <TableCell>{request.EmployeeId}</TableCell>
              <TableCell>{request.Employee.Name}</TableCell>
              <TableCell>{`${request.Employee.Surname1} ${request.Employee.Surname2}`}</TableCell>
              <TableCell>{getRequestType(request.RequestTypeId)}</TableCell>
              <TableCell>{formatDate(request.date)}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    request.RequestStateId === 2
                      ? 'approving'
                      : request.RequestStateId === 3
                      ? 'rejecting'
                      : 'pending'
                  }
                >
                  {getRequestState(request.RequestStateId)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
    </TableBody>
  </Table>
);

export default RequestTable;
