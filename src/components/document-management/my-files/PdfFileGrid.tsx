'use client'

import React from 'react';
import SkeletonLoader from '../SkeletonLoader';
import FileCard from '../FileCard';
import { useUserFiles } from '@/hooks';

const PdfFileGrid = ({ id }: { id: string }) => {
  const { files, isLoading, isError, error } = useUserFiles(id);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (isError) {
    return <div className="text-red-500 text-center">{error?.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {files && files.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No se encontraron archivos.</div>
      )}
    </div>
  );
};

export default PdfFileGrid;