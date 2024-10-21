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

export interface Study {
  id: number;
  name: string;
  StudyCategoryId: string;
}

export default function StudiesTable() {
  const { studies, isLoading } = useGetAllStudies();
  return (
    <div className="container mx-auto p-4 border rounded shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Categoría de estudio</TableHead>
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
                  <TableCell>{study.name}</TableCell>
                  <TableCell>{study.StudyCategoryId}</TableCell>
                  <TableCell>
                    <div className="flex">
                      <EditStudyModal study={study} studyId={study.id} />
                      <DeleteStudyModal id={study.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
