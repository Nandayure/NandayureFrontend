// pages/your-page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import PDFUploader from '@/components/common/pdf-uploader';
import { useParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PdfGrid from '@/components/document-management/digital-files/pdf-file-grid';
import { Eye, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetToken } from '@/hooks';

interface File {
  id: string;
  name: string;
}

const SkeletonLoader = () => (
  <div className="space-y-4">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    ))}
  </div>
);

export default function Page() {
  const { slug } = useParams();
  const EmployeeId = Array.isArray(slug) ? slug[0] : slug;

  const handleDelete = (id: string) => {
    console.log(`Deleting file with id: ${id}`);
  };

  const handleView = (url: string) => {
    console.log(`Viewing file at: ${url}`);
  };
  const { token, status } = useGetToken();
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (EmployeeId) {
      fetchFiles();
    }
  }, [EmployeeId]);

  const fetchFiles = async () => {
    try {
      if (!token)
        throw new Error('No se ha podido obtener el token de autenticación');
      const response = await fetch(
        `https://nandayurebackend-production.up.railway.app/api/v1/google-drive-files/FilesByEmployee/${EmployeeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) throw new Error('Error al cargar los archivos');
      const data = await response.json();
      setFiles(data);
    } catch (err) {
      setError('Error al cargar los archivos. Por favor, intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (fileId: string) => {
    const fileUrl = `https://nandayurebackend-production.up.railway.app/api/v1/google-drive-files/getFile/${fileId}`;
    window.open(fileUrl, '_blank');
  };

  if (status === 'loading') return <SkeletonLoader />;

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );
  if (error) return <div className="text-red-500 text-center">{error}</div>;

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
            <div className="container mx-auto p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden"
                  >
                    <div className="p-4 flex flex-col space-y-4">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-6 h-6 text-blue-500 flex-shrink-0" />
                        <span className="font-semibold truncate">
                          {file.name}.pdf
                        </span>
                      </div>
                      <Button
                        onClick={() => handleFileSelect(file.id)}
                        className="w-full"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Ver PDF
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
