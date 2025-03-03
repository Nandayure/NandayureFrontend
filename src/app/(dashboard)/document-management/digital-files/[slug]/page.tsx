'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PDFUploader from '@/components/common/pdf-uploader';
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
      <Tabs defaultValue="Documents-of-user">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Documents-of-user">
            Documentos
          </TabsTrigger>
          <TabsTrigger value="upload">Subir documentos</TabsTrigger>
        </TabsList>
        <TabsContent value="Documents-of-user">
          <div className="mt-6">
            <EmployeeFilesList employeeId={employeeId} />
          </div>
        </TabsContent>
        <TabsContent value="upload">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Subir documentos</h2>
            <PDFUploader EmployeeId={employeeId} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}