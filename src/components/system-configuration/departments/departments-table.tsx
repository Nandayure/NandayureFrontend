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
import { useGetAllDepartments } from '@/hooks';
import { array } from 'zod';
import SkeletonLoader from '@/components/ui/skeleton-loader';
import DeleteDepartment from './delete-department';
import EditDepartmentForm from './edit-department-form';

export default function DepartmentsTable() {
  const { departments, isLoading } = useGetAllDepartments();
  return (
    <div className="container mx-auto p-4 border rounded shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Programa ID</TableHead>
            <TableHead>Código Presupuesto</TableHead>
            <TableHead>Jefe ID</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <SkeletonLoader className="h-4 w-full" />
                  </TableCell>
                  <TableCell>
                    <SkeletonLoader className="h-4 w-full" />
                  </TableCell>
                  <TableCell>
                    <SkeletonLoader className="h-4 w-full" />
                  </TableCell>
                  <TableCell>
                    <SkeletonLoader className="h-4 w-full" />
                  </TableCell>
                  <TableCell>
                    <SkeletonLoader className="h-4 w-full" />
                  </TableCell>
                  <TableCell>
                    <SkeletonLoader className="h-4 w-full" />
                  </TableCell>
                  <TableCell>
                    <SkeletonLoader className="h-4 w-full" />
                  </TableCell>
                </TableRow>
              ))
            : departments?.map((department) => (
                <TableRow key={department.id}>
                  <TableCell>{department.id}</TableCell>
                  <TableCell>{department.name}</TableCell>
                  <TableCell>{department.description}</TableCell>
                  <TableCell>{department.departmentProgramId}</TableCell>
                  <TableCell>{department.budgetCodeId}</TableCell>
                  <TableCell>{department.departmentHeadId || 'N/A'}</TableCell>
                  <TableCell>
                    <div className="flex">
                      <EditDepartmentForm departmentId={department.id} />
                      <DeleteDepartment />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
