'use client';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import SkeletonLoader from '@/components/ui/skeleton-loader';
import { useGetAllStudies } from '@/hooks';
import EditStudyModal from './edit-study-modal';
import DeleteStudyModal from './delete-study-modal';
import AddStudyModal from './add-study-modal';
import { useEffect, useState } from "react";
import { PaginationController } from "@/components/ui/pagination-controller";
import { SearchBar } from "@/components/ui/search-bar";
import { useSearchFilter } from "@/hooks/use-search-filter";

export interface Study {
  id: number;
  name: string;
  StudyCategoryId: string;
}

export default function StudiesTable() {
  const { studies, isLoading } = useGetAllStudies();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { filteredData: filteredStudies, setSearchValue } = useSearchFilter({
    data: studies || [],
    searchFields: ["id", "name", "StudyCategoryId"],
  });

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudies = filteredStudies.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <AddStudyModal />
        <SearchBar
          onSearch={handleSearch}
          placeholder="Buscar estudios..."
          className="max-w-md"
          InputDataCy="search-study"
        />
      </div>
      <Table data-cy="study-table">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Categoría de estudio</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
              <TableRow key={index} data-cy="study-loading-row">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <TableCell key={idx}>
                    <SkeletonLoader className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
            : currentStudies.length > 0 ? (
              currentStudies.map((study) => (
                <TableRow key={study.id} data-cy={`study-row-${study.id}`}>
                  <TableCell data-cy={`study-id-${study.id}`}>{study.id}</TableCell>
                  <TableCell data-cy={`study-name-${study.id}`}>{study.name}</TableCell>
                  <TableCell data-cy={`study-category-${study.id}`}>{study.StudyCategoryId}</TableCell>
                  <TableCell>
                    <div className="flex">
                      <EditStudyModal study={study} studyId={study.id} />
                      <DeleteStudyModal id={study.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center" data-cy="study-empty-state">
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>

      {!isLoading && filteredStudies.length > 0 && (
        <PaginationController
          totalItems={filteredStudies.length}
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
