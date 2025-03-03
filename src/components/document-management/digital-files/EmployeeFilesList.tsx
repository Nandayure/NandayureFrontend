import React from 'react';
import { useEmployeeFiles } from '@/hooks/files/useEmployeeFiles';
import SkeletonLoader from '../SkeletonLoader';
import FileCard from '../FileCard';

interface EmployeeFilesListProps {
  employeeId: string;
}

const EmployeeFilesList = ({ employeeId }: EmployeeFilesListProps) => {
  const { files, isLoading, isError, error } = useEmployeeFiles(employeeId);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (isError) {
    return <div className="text-red-500 text-center">{error?.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Archivos del Empleado</h1>
      {files && files.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-10">
          No hay archivos disponibles para este empleado.
        </div>
      )}
    </div>
  );
};

export default EmployeeFilesList;