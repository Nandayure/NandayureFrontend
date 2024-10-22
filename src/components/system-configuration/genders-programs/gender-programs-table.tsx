'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import SkeletonLoader from '@/components/ui/skeleton-loader';
import EditGenderProgramModal from './edit-gender-program-modal';
import DeleteGenderProgramModal from './delete-gender-program-modal';
import useGetAllGenderPrograms from '@/hooks/system-configuration/gender-programs/queries/useGetAllGenderPrograms';

export default function GenderProgramsTable() {
  const { genderPrograms, isLoading } = useGetAllGenderPrograms();
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
            : genderPrograms?.map((genderProgram) => (
                <TableRow key={genderProgram.id}>
                  <TableCell>{genderProgram.id}</TableCell>
                  <TableCell>{genderProgram.name}</TableCell>
                  <TableCell>
                    <EditGenderProgramModal
                      genderProgram={genderProgram}
                    />
                    <DeleteGenderProgramModal id={genderProgram.id} />
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
