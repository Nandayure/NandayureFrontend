'use client';
import React from 'react';
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

export default function EmployeeTable() {
  const { employees } = useGetAllEmployees();
  const { jobPositions } = useGetAllJobPositions();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Empleados</h1>
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
          {employees?.map((employee) => {
            // Encuentra el puesto de trabajo correspondiente
            const jobPosition = jobPositions?.find(
              (position) => position.id === employee.JobPositionId,
            );

            return (
              <TableRow key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.Name}</TableCell>
                <TableCell>{`${employee.Surname1} ${employee.Surname2}`}</TableCell>
                <TableCell>{employee.Email}</TableCell>
                <TableCell>{jobPosition?.Name || 'N/A'}</TableCell>
                <TableCell>
                  <Button variant="link">
                    <Link
                      href={`/document-management/digital-files/${employee.id}`}
                    >
                      Ver detalles
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
