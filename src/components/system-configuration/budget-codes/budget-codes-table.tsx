'use client';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetAllBudgetCodes } from '@/hooks';
import EditBudgetCodeMoadol from './edit-budget-codes-modal';
import DeleteBudgetCodeModal from './delete-budget-codes-modal';

export default function BudgetCodesTable() {
  const { budgetCodes, isLoading } = useGetAllBudgetCodes();
  return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Código Salario</TableHead>
            <TableHead>Código Extra</TableHead>
            <TableHead>Código Anuidad</TableHead>
            <TableHead>Código Salario Plus</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <TableCell key={idx}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : budgetCodes?.map((budgetCode) => (
                <TableRow key={budgetCode.id}>
                  <TableCell>{budgetCode.id}</TableCell>
                  <TableCell>{budgetCode.CodSalary}</TableCell>
                  <TableCell>{budgetCode.CodExtra}</TableCell>
                  <TableCell>{budgetCode.CodAnuity}</TableCell>
                  <TableCell>{budgetCode.CodSalaryPlus}</TableCell>
                  <TableCell>
                    <div className="flex">
                      <EditBudgetCodeMoadol budgetCode={budgetCode} />
                      <DeleteBudgetCodeModal id={budgetCode.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
  );
}
