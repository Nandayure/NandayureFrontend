'use client';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetAllCivilStatus} from '@/hooks';
import SkeletonLoader from '@/components/ui/skeleton-loader';
import EditCivilStatusModal from './edit-civilStatus-modal';
import DeleteCivilStatusModal from './delete-civilStatus-modal';


export default function CivilStatusTable() {
  const { civilStatus, isLoading } = useGetAllCivilStatus();
  return (
    <div className="container mx-auto p-4 border rounded shadow">
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
                <TableRow key={index}>
                  {Array.from({ length: 7 }).map((_, idx) => (
                    <TableCell key={idx}>
                      <SkeletonLoader className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : civilStatus?.map((CivilStatus) => (
                <TableRow key={CivilStatus.id}>
                  <TableCell>{CivilStatus.id}</TableCell>
                  <TableCell>{CivilStatus.Name}</TableCell>
                  <TableCell>{CivilStatus.Description}</TableCell>
                 
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
    </div>
  );
}