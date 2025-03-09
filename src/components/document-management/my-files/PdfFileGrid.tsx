'use client'

import React from 'react';
import SkeletonLoader from '../SkeletonLoader';
import FileCard from '../FileCard';
import { PdfFile } from '@/types';

type PdfFileGridProps = {
  files: PdfFile[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  hideDeleteButton?: boolean;
};

const PdfFileGrid = ({ files, isError, isLoading, error, hideDeleteButton = false }: PdfFileGridProps) => {

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (isError) {
    return <div className="text-red-500 text-center">{error?.message || 'An error occurred'}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {files && files.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.map((file) => (
            <FileCard key={file.id} file={file} hideDelete={hideDeleteButton} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No se encontraron archivos.</div>
      )}
    </div>
  );
};

export default PdfFileGrid;