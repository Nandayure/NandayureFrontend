// pages/your-page.tsx
'use client';

import React from 'react';
import PDFUploader from '@/components/common/pdf-uploader';
import { useParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PdfGrid from '@/components/document-management/digital-files/pdf-file-grid';

const mockFiles = [
  // ... tus archivos de prueba
];

export default function Page() {
  const { slug } = useParams();
  const EmployeeId = Array.isArray(slug) ? slug[0] : slug;

  const handleDelete = (id: string) => {
    console.log(`Deleting file with id: ${id}`);
  };

  const handleView = (url: string) => {
    console.log(`Viewing file at: ${url}`);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Documentos de usuario</h1>
      <Tabs defaultValue="Documents-of-user">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Documents-of-user">
            Documentos de usuario
          </TabsTrigger>
          <TabsTrigger value="upload">Subir documentos</TabsTrigger>
        </TabsList>
        <TabsContent value="Documents-of-user">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Documentos de usuario</h2>
            <PdfGrid />
          </div>
        </TabsContent>
        <TabsContent value="upload">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Subir documentos</h2>
            <PDFUploader EmployeeId={EmployeeId} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
