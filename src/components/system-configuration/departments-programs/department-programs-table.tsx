'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGetAllDepartmentPrograms } from '@/hooks';
import SkeletonLoader from '@/components/ui/skeleton-loader';
import EditDepartmentProgramModal from './edit-department-program-modal';
import DeleteDepartmentProgramModal from './delete-department-program-modal';
import { useEffect, useState } from 'react';
import { PaginationController } from '@/components/ui/pagination-controller';
import { SearchBar } from '@/components/ui/search-bar';
import { useSearchFilter } from '@/hooks/use-search-filter';
import AddDepartmentProgramModal from './add-department-program-modal';

export default function DepartmentProgramsTable() {
  const { departmentPrograms, isLoading } = useGetAllDepartmentPrograms();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Puedes ajustar esto según tus necesidades

  // Usar el hook de búsqueda
  const { filteredData: filteredDepartmentPrograms, setSearchValue } = useSearchFilter({
    data: departmentPrograms,
    searchFields: ['id', 'name'],
  });

  // Resetear la página cuando cambia la búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredDepartmentPrograms.length]);

  // Calcular los programas a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDepartmentPrograms = filteredDepartmentPrograms.slice(indexOfFirstItem, indexOfLastItem);

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
        <AddDepartmentProgramModal />
        <SearchBar onSearch={handleSearch} placeholder="Buscar programas..." className="max-w-md" />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Programa</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: 3 }).map((_, idx) => (
                  <TableCell key={idx}>
                    <SkeletonLoader className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : currentDepartmentPrograms.length > 0 ? (
            currentDepartmentPrograms.map((departmentProgram) => (
              <TableRow key={departmentProgram.id}>
                <TableCell>{departmentProgram.id}</TableCell>
                <TableCell>{departmentProgram.name}</TableCell>
                <TableCell>
                  <div className="flex">
                    <EditDepartmentProgramModal departmentProgram={departmentProgram} />
                    <DeleteDepartmentProgramModal id={departmentProgram.id} />
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

      {!isLoading && filteredDepartmentPrograms.length > 0 && (
        <PaginationController
          totalItems={filteredDepartmentPrograms.length}
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
