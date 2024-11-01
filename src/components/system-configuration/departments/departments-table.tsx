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
import SkeletonLoader from '@/components/ui/skeleton-loader';
import EditDepartmentModal from './edit-department-modal';
import DeleteDepartmentModal from './delete-department-modal';

export default function DepartmentsTable() {
  const { departments, isLoading } = useGetAllDepartments();
  return (
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
                {Array.from({ length: 7 }).map((_, idx) => (
                  <TableCell key={idx}>
                    <SkeletonLoader className="h-4 w-full" />
                  </TableCell>
                ))}
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
                    <EditDepartmentModal
                      department={department}
                      departmentId={department.id}
                    />
                    <DeleteDepartmentModal id={department.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}
