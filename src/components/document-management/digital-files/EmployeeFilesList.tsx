import React from 'react';
import { useGetFoldersByEmployee } from '@/hooks';
import FolderSkeleton from '../folders/folder-skeleton';
import FolderError from '../folders/folder-error';
import FolderGrid from '../folders/folder-grid';
import FolderEmpty from '../folders/folder-empty';

interface EmployeeFilesListProps {
  employeeId: string;
}

const EmployeeFilesList = ({ employeeId }: EmployeeFilesListProps) => {
  const { foldersByEmployee,
    isLoading,
    isError,
    error,
    refetch } = useGetFoldersByEmployee(Number(employeeId));

  if (isLoading) {
    return <FolderSkeleton />
  }

  if (isError) {
    return <FolderError error={error} onRetry={refetch} />
  }

  if (!foldersByEmployee || foldersByEmployee.length === 0) {
    return <FolderEmpty onRefresh={refetch} />
  }

  return (
    <div className="container mx-auto py-10">
      <FolderGrid folders={foldersByEmployee} path={`/document-management/digital-files/${employeeId}`} />
    </div>
  )
}

export default EmployeeFilesList;