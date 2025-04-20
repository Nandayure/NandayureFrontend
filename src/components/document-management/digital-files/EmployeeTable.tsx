'use client';

import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useGetAllEmployees, useGetAllJobPositions } from '@/hooks';
import Link from 'next/link';
import { PaginationController } from "@/components/ui/pagination-controller";
import { SearchBar } from "@/components/ui/search-bar";
import SkeletonLoader from "@/components/ui/skeleton-loader";
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/use-debounce';

export default function EmployeeTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemsPerPage = 5;

  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || "");
  const debouncedSearch = useDebounce(searchValue, 500);

  const { employees, pagination, isLoading } = useGetAllEmployees({
    page: String(currentPage),
    limit: String(itemsPerPage),
    name: debouncedSearch || undefined
  });

  const { jobPositions } = useGetAllJobPositions();

  // Update URL when search or page changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedSearch) {
      params.set('search', debouncedSearch);
    } else {
      params.delete('search');
    }
    params.set('page', currentPage.toString());
    router.push('?' + params.toString());
  }, [debouncedSearch, currentPage]);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-4">
        <SearchBar
          onSearch={handleSearch}
          value={searchValue}
          placeholder="Buscar empleados..."
          className="max-w-md"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Apellidos</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            // Estado de carga
            Array.from({ length: itemsPerPage }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: 6 }).map((_, idx) => (
                  <TableCell key={idx}>
                    <SkeletonLoader className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : employees.length > 0 ? (
            // Datos filtrados
            employees.map((employee) => {
              // Encuentra el puesto de trabajo correspondiente
              const jobPosition = jobPositions?.find(
                (position) => position.id === employee.JobPositionId,
              );

              return (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.Name}</TableCell>
                  <TableCell>{`${employee.Surname1} ${employee.Surname2 || ''}`}</TableCell>
                  <TableCell>{employee.Email}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      <Link
                        href={`/document-management/digital-files/${employee.id}`}
                        className="flex items-center gap-1"
                      >
                        <FileText className="h-4 w-4" />
                        <span className="hidden sm:inline">Ver documentos</span>
                        <span className="sm:hidden">Ver</span>
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            // No hay resultados
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No se encontraron resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {!isLoading && pagination.totalPages > 1 && (
        <PaginationController
          totalItems={pagination.totalItems}
          itemsPerPage={Number(pagination.limit)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          siblingCount={1}
          className="mt-4"
        />
      )}
    </div>
  );
}