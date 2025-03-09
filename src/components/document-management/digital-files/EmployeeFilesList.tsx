import React from 'react';
import { useGetFoldersByEmployee } from '@/hooks';

interface EmployeeFilesListProps {
  employeeId: string;
}

const EmployeeFilesList = ({ employeeId }: EmployeeFilesListProps) => {
  const { foldersByEmployee,
    isLoading,
    isError,
    error,
    refetch } = useGetFoldersByEmployee(Number(employeeId));

  return (
    <h1>
      EmployeeFilesList
    </h1>
  );
};

export default EmployeeFilesList;