import { useGetAllFinancialInstitutions } from '@/hooks';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DeleteFinancialInstitutionsModal from './delete-financial-institutions-modal';
import EditFinancialInstitutionsModal from './edit-financial-institutions-modal';

export default function FinancialInstitutionsTable() {
  const { financialInstitutions, isLoading } = useGetAllFinancialInstitutions();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead>Porcentaje de deducción</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <TableCell key={idx}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          : financialInstitutions?.map((financialInstitutions) => (
              <TableRow key={financialInstitutions.id}>
                <TableCell>{financialInstitutions.id}</TableCell>
                <TableCell>{financialInstitutions.name}</TableCell>
                <TableCell>{financialInstitutions.description}</TableCell>
                <TableCell>
                  {financialInstitutions.deductionPercentage}
                </TableCell>
                <TableCell>
                  <div className="flex">
                    <EditFinancialInstitutionsModal
                      financialInstitution={financialInstitutions}
                    />
                    <DeleteFinancialInstitutionsModal
                      id={financialInstitutions.id}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}
