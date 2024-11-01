'use client';

import { useGetAllJobPositions } from '@/hooks';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DeleteJobPositionsModal from './delete-job-positions-modal';
import EditJobPositionsModal from './edit-job-positions-modal';

export default function JobPositionsTable() {
  const { jobPositions, isLoading } = useGetAllJobPositions();
  return (
    <div className="container mx-auto p-4 border rounded shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Salario base</TableHead>
            <TableHead>Salario global</TableHead>
            <TableHead>Salario extra</TableHead>
            <TableHead>Departamento</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  {Array.from({ length: 7 }).map((_, idx) => (
                    <TableCell key={idx}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : jobPositions?.map((jobPosition) => (
                <TableRow key={jobPosition.id}>
                  <TableCell>{jobPosition.id}</TableCell>
                  <TableCell>{jobPosition.Name}</TableCell>
                  <TableCell>{jobPosition.Description}</TableCell>
                  <TableCell className='w-32'>₡ {jobPosition.baseSalary}</TableCell>
                  <TableCell>₡ {jobPosition.globalSalary}</TableCell>
                  <TableCell>₡ {jobPosition.extrafees}</TableCell>
                  <TableCell>{jobPosition.DepartmentId}</TableCell>
                  <TableCell>
                    <div className="flex">
                      <EditJobPositionsModal jobPosition={jobPosition} />
                      <DeleteJobPositionsModal id={jobPosition.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
