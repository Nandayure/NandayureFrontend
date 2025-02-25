'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetAllCivilStatus } from '@/hooks';
import SkeletonLoader from '@/components/ui/skeleton-loader';
import EditCivilStatusModal from './edit-civilStatus-modal';
import DeleteCivilStatusModal from './delete-civilStatus-modal';

export default function CivilStatusTable() {
  const { civilStatus, isLoading } = useGetAllCivilStatus();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
            <TableRow key={index} data-cy="civil-status-loading-row">
              {Array.from({ length: 7 }).map((_, idx) => (
                <TableCell key={idx}>
                  <SkeletonLoader className="h-4 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))
          : civilStatus?.map((CivilStatus) => (
            <TableRow key={CivilStatus.id} data-cy={`civil-status-row-${CivilStatus.id}`}>
              <TableCell data-cy={`civil-status-id-${CivilStatus.id}`}>{CivilStatus.id}</TableCell>
              <TableCell data-cy={`civil-status-name-${CivilStatus.id}`}>{CivilStatus.Name}</TableCell>
              <TableCell data-cy={`civil-status-description-${CivilStatus.id}`}>{CivilStatus.Description}</TableCell>

              <TableCell>
                <div className="flex">
                  <EditCivilStatusModal
                    CivilStatus={CivilStatus}
                    civilStatusId={CivilStatus.id}
                  />
                  <DeleteCivilStatusModal id={CivilStatus.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
