'use client';

import { useGetAllDepartments, useGetAllJobPositions } from '@/hooks';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DeleteJobPositionsModal from './delete-job-positions-modal';
import EditJobPositionsModal from './edit-job-positions-modal';
import { useEffect, useState } from "react";
import { PaginationController } from "@/components/ui/pagination-controller";
import { SearchBar } from "@/components/ui/search-bar";
import { useSearchFilter } from "@/hooks/use-search-filter";
import AddJobPositionsModal from './add-job-positions-modal';

export default function JobPositionsTable() {
  const { jobPositions, isLoading } = useGetAllJobPositions();
  const { departments = [] } = useGetAllDepartments()
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Usar el hook de búsqueda
  const { filteredData: filteredJobPositions, setSearchValue } = useSearchFilter({
    data: jobPositions || [],
    searchFields: ["id", "Name", "Description", "DepartmentId"],
  });

  // Resetear la página cuando cambia la búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, []);

  // Calcular los puestos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobPositions = filteredJobPositions.slice(indexOfFirstItem, indexOfLastItem);

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
        <AddJobPositionsModal />
        <SearchBar onSearch={handleSearch} placeholder="Buscar puestos de trabajo..." className="max-w-md" 
        InputDataCy='search-job-position'/>
      </div>
      <Table data-cy="job-position-table">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Salario base</TableHead>
            <TableHead>Salario global</TableHead>
            <TableHead>Salario extra</TableHead>
            <TableHead>Departamento</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
              <TableRow key={index} data-cy="job-position-loading-row">
                {Array.from({ length: 7 }).map((_, idx) => (
                  <TableCell key={idx}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
            : currentJobPositions.length > 0 ? (
              currentJobPositions.map((jobPosition) => (
                <TableRow key={jobPosition.id}>
                  <TableCell data-cy={`jobPosition-id-${jobPosition.id}`}>{jobPosition.id}</TableCell>
                  <TableCell data-cy={`jobPosition-name-${jobPosition.Name}`}>{jobPosition.Name}</TableCell>
                  <TableCell data-cy={`jobPosition-description-${jobPosition.Description}`}>{jobPosition.Description}</TableCell>
                  <TableCell className="w-32" data-cy={`jobPosition-baseSalary-${jobPosition.baseSalary}`}> ₡ {jobPosition.baseSalary}</TableCell>
                  <TableCell className="w-32" data-cy={`jobPosition-globalSalary-${jobPosition.globalSalary}`}>₡ {jobPosition.globalSalary}</TableCell>
                  <TableCell className="w-32" data-cy={`jobPosition-extrafees-${jobPosition.extrafees}`}>₡ {jobPosition.extrafees}</TableCell>
                  <TableCell>{departments.find((department) => department.id === jobPosition.DepartmentId)?.name}</TableCell>
                  <TableCell>
                    <div className="flex">
                      <EditJobPositionsModal jobPosition={jobPosition} />
                      <DeleteJobPositionsModal id={jobPosition.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow data-cy="job-position-empty-row">
                <TableCell colSpan={8} className="h-24 text-center">
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>

      {!isLoading && filteredJobPositions.length > 0 && (
        <PaginationController
          totalItems={filteredJobPositions.length}
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
