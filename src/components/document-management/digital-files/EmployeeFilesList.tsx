import React from 'react';
import { useGetFoldersByEmployee } from '@/hooks';
import FolderSkeleton from '../folders/folder-skeleton';
import FolderError from '../folders/folder-error';
import FolderGrid from '../folders/folder-grid';
import FolderList from '../folders/folder-list';
import FolderEmpty from '../folders/folder-empty';

interface EmployeeFilesListProps {
  employeeId: string;
  viewMode?: "grid" | "list";
}

const EmployeeFilesList = ({ employeeId, viewMode = "grid" }: EmployeeFilesListProps) => {
  const {
    foldersByEmployee,
    isLoading,
    isError,
    error,
    refetch
  } = useGetFoldersByEmployee(Number(employeeId));

  if (isLoading) {
    return <FolderSkeleton />
  }

  if (isError) {
    return <FolderError error={error} onRetry={refetch} />
  }

  if (!foldersByEmployee || foldersByEmployee.length === 0) {
    return <FolderEmpty onRefresh={refetch} />
  }

  // Set the path for folder navigation
  const path = `/document-management/digital-files/${employeeId}`;

  return (
    <>
      {viewMode === "grid" ? (
        <FolderGrid folders={foldersByEmployee} path={path} />
      ) : (
        <FolderList folders={foldersByEmployee} path={path} />
      )}
    </>
  );
}

export default EmployeeFilesList;