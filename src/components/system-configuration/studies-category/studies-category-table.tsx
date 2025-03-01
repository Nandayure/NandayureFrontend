'use client';
import { useGetAllStudiesCategory } from '@/hooks';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import EditStudiesCategoryModal from './edit-studies-category-modal';
import DeleteStudiesCategoryModal from './delete-studies-category-modal';
import { useEffect, useState } from "react";
import { PaginationController } from "@/components/ui/pagination-controller";
import { SearchBar } from "@/components/ui/search-bar";
import { useSearchFilter } from "@/hooks/use-search-filter";
import AddStudiesCategoryModal from './add-studies-category-modal';

export default function StudiesCategoryTable() {
  const { studiesCategory, isLoading } = useGetAllStudiesCategory();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Usar el hook de búsqueda
  const { filteredData: filteredStudiesCategory, setSearchValue } = useSearchFilter({
    data: studiesCategory || [],
    searchFields: ["id", "description", "weight", "Dedication", "Restriction"],
  });

  // Resetear la página cuando cambia la búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, []);

  // Calcular las categorías de estudios a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = filteredStudiesCategory.slice(indexOfFirstItem, indexOfLastItem);

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
        <AddStudiesCategoryModal />
        <SearchBar onSearch={handleSearch} placeholder="Buscar categorías de estudios..." className="max-w-md" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Peso</TableHead>
            <TableHead>Dedicación</TableHead>
            <TableHead>Restricción</TableHead>
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
            : currentCategories.length > 0 ? (
              currentCategories.map((studiesCategory) => (
                <TableRow key={studiesCategory.id}>
                  <TableCell>{studiesCategory.id}</TableCell>
                  <TableCell>{studiesCategory.description}</TableCell>
                  <TableCell>{studiesCategory.weight}</TableCell>
                  <TableCell>{studiesCategory.Dedication}</TableCell>
                  <TableCell>{studiesCategory.Restriction}</TableCell>
                  <TableCell>
                    <div className="flex">
                      <EditStudiesCategoryModal
                        categoryStudies={studiesCategory}
                      />
                      <DeleteStudiesCategoryModal id={studiesCategory.id} />
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

      {!isLoading && filteredStudiesCategory.length > 0 && (
        <PaginationController
          totalItems={filteredStudiesCategory.length}
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
