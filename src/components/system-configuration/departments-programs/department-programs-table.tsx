'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetAllDepartmentPrograms } from '@/hooks';
import SkeletonLoader from '@/components/ui/skeleton-loader';
import EditDepartmentProgramModal from './edit-department-program-modal';
import DeleteDepartmentProgramModal from './delete-department-program-modal';

export default function DepartmentProgramsTable() {
  const { departmentPrograms, isLoading } = useGetAllDepartmentPrograms();
  return (
    <div className="container mx-auto p-4 border rounded shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Programa</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <TableCell key={idx}>
                      <SkeletonLoader className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : departmentPrograms?.map((departmentProgram) => (
                <TableRow key={departmentProgram.id}>
                  <TableCell>{departmentProgram.id}</TableCell>
                  <TableCell>{departmentProgram.name}</TableCell>
                  <TableCell>
                    <EditDepartmentProgramModal
                      departmentProgram={departmentProgram}
                    />
                    <DeleteDepartmentProgramModal id={departmentProgram.id} />
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
