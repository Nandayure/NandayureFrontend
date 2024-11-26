'use client';

import { useGetAllTypeFinancialInstitutions } from '@/hooks';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DeleteTypeFinancialInstitutionsModal from './delete-type-financial-institutions-modal';
import EditTypeFinancialInstitutionsModal from './edit-type-financial-institutions-modal';

export default function TypeFinancialInstitutionsTable() {
  const { typeFinancialInstitutions, isLoading } =
    useGetAllTypeFinancialInstitutions();
  return (
    <div className="container mx-auto p-4 border rounded shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <TableCell key={idx}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : typeFinancialInstitutions?.map((typeFinancialInstitutions) => (
                <TableRow key={typeFinancialInstitutions.id}>
                  <TableCell>{typeFinancialInstitutions.id}</TableCell>
                  <TableCell>{typeFinancialInstitutions.name}</TableCell>
                  <TableCell>
                    <div className="flex">
                      <EditTypeFinancialInstitutionsModal
                        typeFinancialInstitution={typeFinancialInstitutions}
                      />
                      <DeleteTypeFinancialInstitutionsModal
                        id={typeFinancialInstitutions.id}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
