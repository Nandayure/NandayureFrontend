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
import { useEffect, useState } from "react";
import { PaginationController } from "@/components/ui/pagination-controller";
import { SearchBar } from "@/components/ui/search-bar";
import { useSearchFilter } from "@/hooks/use-search-filter";
import AddCivilStatusModal from "./add-civilStatus-modal";

export default function CivilStatusTable() {
  const { civilStatus, isLoading } = useGetAllCivilStatus();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Usar el hook de búsqueda
  const { filteredData: filteredCivilStatus, setSearchValue } = useSearchFilter({
    data: civilStatus || [],
    searchFields: ["id", "Name", "Description"],
  });

  // Resetear la página cuando cambia la búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, []);

  // Calcular los estados civiles a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCivilStatus = filteredCivilStatus.slice(indexOfFirstItem, indexOfLastItem);

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
        <AddCivilStatusModal />
        <SearchBar onSearch={handleSearch} placeholder="Buscar estado civil..." className="max-w-md" InputDataCy='search-civil-status' />
      </div>
      <Table data-cy="civil-status-table">
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
                {Array.from({ length: 4 }).map((_, idx) => (
                  <TableCell key={idx}>
                    <SkeletonLoader className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
            : currentCivilStatus.length > 0 ? (
              currentCivilStatus.map((CivilStatus) => (
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>

      {!isLoading && filteredCivilStatus.length > 0 && (
        <PaginationController
          totalItems={filteredCivilStatus.length}
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
