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
import { useSearchFilter } from "@/hooks/use-search-filter";
import SkeletonLoader from "@/components/ui/skeleton-loader";
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';

export default function EmployeeTable() {
  const { employees, isLoading } = useGetAllEmployees();
  const { jobPositions } = useGetAllJobPositions();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { filteredData: filteredEmployees, setSearchValue } = useSearchFilter({
    data: employees,
    searchFields: ["id", "Name", "Surname1", "Surname2", "Email", "JobPositionId"],
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredEmployees.length]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = filteredEmployees?.slice(indexOfFirstItem, indexOfLastItem) || [];

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
            <TableHead>Posición</TableHead>
            <TableHead>Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            // Estado de carga
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: 6 }).map((_, idx) => (
                  <TableCell key={idx}>
                    <SkeletonLoader className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : currentEmployees.length > 0 ? (
            // Datos filtrados
            currentEmployees.map((employee) => {
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
                    {jobPosition?.Name ? (
                      <Badge variant="outline" className="font-normal">
                        {jobPosition.Name}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground font-normal">
                        N/A
                      </Badge>
                    )}
                  </TableCell>
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

      {!isLoading && filteredEmployees && filteredEmployees.length > 0 && (
        <PaginationController
          totalItems={filteredEmployees.length}
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