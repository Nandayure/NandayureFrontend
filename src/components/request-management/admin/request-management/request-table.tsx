import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { RequestDetails } from '@/types';
import { Badge } from '../../../ui/badge';
import { formatDate } from '@/lib/utils';
import { getRequestState, getRequestType } from '../../request-helpers';
import SkeletonLoader from '@/components/ui/skeleton-loader';

const RequestTable = ({
  requests,
  isLoading,
  onRowClick,
}: {
  requests: RequestDetails[];
  isLoading: boolean;
  onRowClick: (request: RequestDetails) => void;
}) => (
  <div className="border rounded shadow">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID de Solicitud</TableHead>
          <TableHead>ID de Empleado</TableHead>
          <TableHead>Nombre de Empleado</TableHead>
          <TableHead>Apellidos</TableHead>
          <TableHead>Tipo de Solicitud</TableHead>
          <TableHead>Fecha de Solicitud</TableHead>
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
                <TableCell>{request.Name}</TableCell>
                <TableCell>{`${request.Surname1} ${request.Surname2}`}</TableCell>
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
  </div>
);

export default RequestTable;
