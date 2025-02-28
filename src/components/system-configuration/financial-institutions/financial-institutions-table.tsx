'use client';

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
import { useEffect, useState } from "react";
import { PaginationController } from "@/components/ui/pagination-controller";
import { SearchBar } from "@/components/ui/search-bar";
import { useSearchFilter } from "@/hooks/use-search-filter";
import AddFinancialInstitutionsModal from './add-financial-institutions-modal';

export default function FinancialInstitutionsTable() {
  const { financialInstitutions, isLoading } = useGetAllFinancialInstitutions();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Usar el hook de búsqueda
  const { filteredData: filteredInstitutions, setSearchValue } = useSearchFilter({
    data: financialInstitutions || [],
    searchFields: ["id", "name", "description", "deductionPercentage"],
  });

  // Resetear la página cuando cambia la búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, []);

  // Calcular las instituciones a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInstitutions = filteredInstitutions.slice(indexOfFirstItem, indexOfLastItem);

  // Función para cambiar de página
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Función para manejar la búsqueda
  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <AddFinancialInstitutionsModal />
        <SearchBar onSearch={handleSearch} placeholder="Buscar instituciones financieras..." className="max-w-md" />
      </div>
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
            : currentInstitutions.length > 0 ? (
              currentInstitutions.map((institution) => (
                <TableRow key={institution.id}>
                  <TableCell>{institution.id}</TableCell>
                  <TableCell>{institution.name}</TableCell>
                  <TableCell>{institution.description}</TableCell>
                  <TableCell>
                    {institution.deductionPercentage}
                  </TableCell>
                  <TableCell>
                    <div className="flex">
                      <EditFinancialInstitutionsModal
                        financialInstitution={institution}
                      />
                      <DeleteFinancialInstitutionsModal
                        id={institution.id}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>

      {!isLoading && filteredInstitutions.length > 0 && (
        <PaginationController
          totalItems={filteredInstitutions.length}
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
