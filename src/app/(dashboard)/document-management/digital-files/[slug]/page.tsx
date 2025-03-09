'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useGetByIdEmployee, useGetToken } from '@/hooks';
import SkeletonLoader from '@/components/ui/skeleton-loader';
import EmployeeFilesList from '@/components/document-management/digital-files/EmployeeFilesList';

export default function EmployeeDocumentsPage() {
  const { slug } = useParams();
  const employeeId = Array.isArray(slug) ? slug[0] : slug;
  const { employeeById } = useGetByIdEmployee({ employeeId: Number(employeeId) });
  console.log(employeeById);
  const { status: tokenStatus } = useGetToken();

  if (tokenStatus === 'loading') return <SkeletonLoader />;

  return (
    <div className="container mx-auto py-10">
      <h1 className="flex text-3xl font-bold mb-6 justify-center">
        Documentos de {employeeById?.Name} {employeeById?.Surname1} {employeeById?.Surname2}
      </h1>
      <div className="mt-6">
        <EmployeeFilesList employeeId={employeeId} />
      </div>
    </div>
  );
}