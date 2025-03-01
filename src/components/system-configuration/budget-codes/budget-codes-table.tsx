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
import { useEffect, useState } from "react";
import { PaginationController } from "@/components/ui/pagination-controller";
import { SearchBar } from "@/components/ui/search-bar";
import { useSearchFilter } from "@/hooks/use-search-filter";
import AddBudgetCodeModal from "./add-budget-codes-modal";

export default function BudgetCodesTable() {
  const { budgetCodes, isLoading } = useGetAllBudgetCodes();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Use search filter hook
  const { filteredData: filteredBudgetCodes, setSearchValue } = useSearchFilter({
    data: budgetCodes,
    searchFields: ["id", "CodSalary", "CodExtra", "CodAnuity", "CodSalaryPlus"],
  });

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, []);

  // Calculate items for current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBudgetCodes = filteredBudgetCodes.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Handle search
  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <AddBudgetCodeModal />
        <SearchBar onSearch={handleSearch} placeholder="Buscar códigos de presupuesto..." className="max-w-md" />
      </div>
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
            : currentBudgetCodes.length > 0 ? (
              currentBudgetCodes.map((budgetCode) => (
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>

      {!isLoading && filteredBudgetCodes.length > 0 && (
        <PaginationController
          totalItems={filteredBudgetCodes.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          siblingCount={1}
          className="mt-4"
        />
      )}
    </div>
  );
}
