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
import { useEffect, useState } from "react";
import { PaginationController } from "@/components/ui/pagination-controller";
import { SearchBar } from "@/components/ui/search-bar";
import { useSearchFilter } from "@/hooks/use-search-filter";
import AddTypeFinancialInstitutionsModal from './add-type-financial-institutions-modal';

export default function TypeFinancialInstitutionsTable() {
  const { typeFinancialInstitutions, isLoading } =
    useGetAllTypeFinancialInstitutions();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Usar el hook de búsqueda
  const { filteredData: filteredTypeFinancialInstitutions, setSearchValue } = useSearchFilter({
    data: typeFinancialInstitutions || [],
    searchFields: ["id", "name"],
  });

  // Resetear la página cuando cambia la búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, []);

  // Calcular los tipos de instituciones financieras a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTypeFinancialInstitutions = filteredTypeFinancialInstitutions.slice(indexOfFirstItem, indexOfLastItem);

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
        <AddTypeFinancialInstitutionsModal />
        <SearchBar onSearch={handleSearch} placeholder="Buscar tipos de instituciones..." className="max-w-md" />
      </div>
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
            : currentTypeFinancialInstitutions.length > 0 ? (
              currentTypeFinancialInstitutions.map((typeFinancialInstitution) => (
                <TableRow key={typeFinancialInstitution.id}>
                  <TableCell>{typeFinancialInstitution.id}</TableCell>
                  <TableCell>{typeFinancialInstitution.name}</TableCell>
                  <TableCell>
                    <div className="flex">
                      <EditTypeFinancialInstitutionsModal
                        typeFinancialInstitution={typeFinancialInstitution}
                      />
                      <DeleteTypeFinancialInstitutionsModal
                        id={typeFinancialInstitution.id}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>

      {!isLoading && filteredTypeFinancialInstitutions.length > 0 && (
        <PaginationController
          totalItems={filteredTypeFinancialInstitutions.length}
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
