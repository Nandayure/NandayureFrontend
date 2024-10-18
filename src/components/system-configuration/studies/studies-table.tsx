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

export interface Studies {
  id: string;
  description: string;
  weight: number;
  Dedication: number;
  Restriction: number;
}


export default function StudiesTable() {
  const { studies, isLoading } = useGetAllStudies();
  return (
    <div className="container mx-auto p-4 border rounded shadow">
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
                      <SkeletonLoader className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : studies?.map((study) => (
                <TableRow key={study.id}>
                  <TableCell>{study.id}</TableCell>
                  <TableCell>{study.description}</TableCell>
                  <TableCell>{study.weight}</TableCell>
                  <TableCell>{study.Dedication}</TableCell>
                  <TableCell>{study.Restriction}</TableCell>
                  <TableCell>
                    <div className="flex">
                      
                    </div>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
