// src/components/AnnuitiesTable.tsx

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGetAllAnnuities } from '@/hooks';
import SkeletonLoader from '@/components/ui/skeleton-loader';
import EditAnnuityModal from './EditAnnuityModal';
import DeleteAnnuityModal from './DeleteAnnuityModal';
import { useEffect, useState } from "react";
import { PaginationController } from "@/components/ui/pagination-controller";
import { SearchBar } from "@/components/ui/search-bar";
import { useSearchFilter } from "@/hooks/use-search-filter";
import AddAnnuityModal from './AddAnnuityModal';

export default function AnnuitiesTable() {
  const { annuities, isLoading, isError } = useGetAllAnnuities();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Usar el hook de búsqueda
  const { filteredData: filteredAnnuities, setSearchValue } = useSearchFilter({
    data: annuities || [],
    searchFields: ["id", "Description", "Amount", "Date", "employee"],
  });

  // Resetear la página cuando cambia la búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, []);

  // Calcular los elementos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAnnuities = filteredAnnuities.slice(indexOfFirstItem, indexOfLastItem);

  // Función para cambiar de página
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Función para manejar la búsqueda
  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  if (isLoading) {
    return <SkeletonLoader className="h-4 w-full" />;
  }

  if (isError) {
    return <div>Error cargando datos de anualidades.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <AddAnnuityModal />
        <SearchBar onSearch={handleSearch} placeholder="Buscar anualidades..." className="max-w-md" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead>Empleado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentAnnuities.length > 0 ? (
            currentAnnuities.map((annuity) => (
              <TableRow key={annuity.id}>
                <TableCell>{annuity.id}</TableCell>
                <TableCell>
                  {new Date(annuity.Date).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </TableCell>
                <TableCell>{annuity.Description}</TableCell>
                <TableCell>{Number(annuity.Amount || 0).toFixed(2)}</TableCell>
                <TableCell>
                  {annuity.employee
                    ? `${annuity.employee.Name} ${annuity.employee.Surname1} ${annuity.employee.Surname2}`
                    : 'Empleado desconocido'}
                </TableCell>
                <TableCell>
                  <div className="flex">
                    <EditAnnuityModal annuity={annuity} annuityId={annuity.id} />
                    <DeleteAnnuityModal id={annuity.id} />
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

      {filteredAnnuities.length > 0 && (
        <PaginationController
          totalItems={filteredAnnuities.length}
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
