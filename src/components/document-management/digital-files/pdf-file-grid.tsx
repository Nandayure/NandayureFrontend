'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, Eye, FileText } from 'lucide-react';
import useGetToken from '@/hooks/common/useGetToken';

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

const PdfFileGrid = () => {
  const { token, status } = useGetToken();
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      fetchFiles();
    }
  }, [token]);

  const fetchFiles = async () => {
    try {
      if (!token)
        throw new Error('No se ha podido obtener el token de autenticación');
      const response = await fetch(
        'https://nandayurebackend-production.up.railway.app/api/v1/google-drive-files/MyFiles',
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Archivos del Empleado</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map((file) => (
          <div
            key={file.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="p-4 flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <FileText className="w-6 h-6 text-blue-500 flex-shrink-0" />
                <span className="font-semibold truncate">{file.name}.pdf</span>
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
  );
};

export default PdfFileGrid;