// src/components/AnnuitiesTable.tsx

import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetAllAnnuities } from '@/hooks';
import SkeletonLoader from '@/components/ui/skeleton-loader';
import EditAnnuityModal from './EditAnnuityModal';
import DeleteAnnuityModal from './DeleteAnnuityModal';

export default function AnnuitiesTable() {
  const { annuities, isLoading, isError } = useGetAllAnnuities();

  if (isLoading) {
    return <SkeletonLoader className="h-4 w-full" />;
  }

  if (isError) {
    return <div>Error cargando datos de anualidades.</div>;
  }

  return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead>Empleado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {annuities?.map((annuity) => (
            <TableRow key={annuity.id}>
              <TableCell>{annuity.id}</TableCell>
              <TableCell>
                {new Date(annuity.Date).toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </TableCell>
              <TableCell>{annuity.Description}</TableCell>
              <TableCell>{Number(annuity.Amount || 0).toFixed(2)}</TableCell>

              <TableCell>
                {annuity.employee 
                  ? `${annuity.employee.Name} ${annuity.employee.Surname1} ${annuity.employee.Surname2}` 
                  : 'Empleado desconocido'}
              </TableCell>
              <TableCell>
                <div className="flex">
                  <EditAnnuityModal annuity={annuity} annuityId={annuity.id} />
                  <DeleteAnnuityModal id={annuity.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  );
}
