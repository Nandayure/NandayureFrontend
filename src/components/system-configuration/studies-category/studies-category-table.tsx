'use client';
import { useGetAllStudiesCategory } from '@/hooks';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function StudiesCategoryTable() {
  const { studiesCategory, isLoading } = useGetAllStudiesCategory();
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
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : studiesCategory?.map((studiesCategory) => (
                <TableRow key={studiesCategory.id}>
                  <TableCell>{studiesCategory.id}</TableCell>
                  <TableCell>{studiesCategory.description}</TableCell>
                  <TableCell>{studiesCategory.weight}</TableCell>
                  <TableCell>{studiesCategory.Dedication}</TableCell>
                  <TableCell>{studiesCategory.Restriction}</TableCell>

                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
