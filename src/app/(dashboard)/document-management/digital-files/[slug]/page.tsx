'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useGetByIdEmployee, useGetToken } from '@/hooks';
import SkeletonLoader from '@/components/ui/skeleton-loader';
import EmployeeFilesList from '@/components/document-management/digital-files/EmployeeFilesList';
import { PageHeader } from '@/components/ui/section-title';

export default function EmployeeDocumentsPage() {
  const { slug } = useParams();
  const employeeId = Array.isArray(slug) ? slug[0] : slug;
  const { employeeById } = useGetByIdEmployee({ employeeId: Number(employeeId) });
  console.log(employeeById);
  const { status: tokenStatus } = useGetToken();

  if (tokenStatus === 'loading') return <SkeletonLoader />;

  return (
    <div className="container mx-auto py-10">
      <PageHeader
        title={`Documentos de ${employeeById?.Name} ${employeeById?.Surname1} ${employeeById?.Surname2}`}
        description="Acceda y gestione la documentación oficial de los colaboradores."
      />
      <div className="mt-6">
        <EmployeeFilesList employeeId={employeeId} />
      </div>
    </div>
  );
}