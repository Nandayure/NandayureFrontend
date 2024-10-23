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
import EditGenderModal from './edit-gender-modal';
import DeleteGenderProgramModal from './delete-gender-modal';
import { useGetAllGenders } from '@/hooks';

export default function GendersTable() {
  const { genders, isLoading } = useGetAllGenders();
  return (
    <div className="container mx-auto p-4 border rounded shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Género</TableHead>
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
            : genders?.map((gender) => (
                <TableRow key={gender.id}>
                  <TableCell>{gender.id}</TableCell>
                  <TableCell>{gender.Name}</TableCell>  
                  <TableCell>
                    <div className='flex'>
                    <EditGenderModal
                        gender={gender}
                        genderId={gender.id}
                      />
                      <DeleteGenderProgramModal id={gender.id} />
                      </div> 
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
