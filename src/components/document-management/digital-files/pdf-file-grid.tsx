// PdfFileGrid.tsx
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, Eye, FileText } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useGetToken } from '@/hooks';

// Definición de la interfaz para los archivos
interface File {
  id: string;
  name: string;
}

// Componente de carga skeleton
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
  const { slug } = useParams();
  const EmployeeId = Array.isArray(slug) ? slug[0] : slug;
  const { token, status } = useGetToken();

  // Función para obtener los archivos del empleado
  const fetchFiles = async (): Promise<File[]> => {
    if (!EmployeeId) {
      throw new Error('No se proporcionó el ID del empleado');
    }
    if (!token) {
      throw new Error('No se ha podido obtener el token de autenticación');
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/google-drive-files/FilesByEmployee/${EmployeeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Error al cargar los archivos');
    }

    const data: File[] = await response.json();
    return data;
  };

  // Uso de React Query para obtener los archivos
  const {
    data: files,
    isLoading: isFilesLoading,
    isError: isFilesError,
    error: filesError,
  } = useQuery<File[], Error>({
    queryKey: ['files', EmployeeId],
    queryFn: fetchFiles,
    enabled: Boolean(EmployeeId) && Boolean(token), // Solo ejecuta la consulta si EmployeeId y token están disponibles
    retry: false, // Desactiva reintentos automáticos
    staleTime: 5 * 60 * 1000, // Los datos se consideran frescos por 5 minutos
  });

  // Función para manejar la selección de un archivo
  const handleFileSelect = (fileId: string) => {
    const fileUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/google-drive-files/getFile/${fileId}`;
    window.open(fileUrl, '_blank');
  };

  // Renderiza el skeleton mientras se obtiene el token
  if (status === 'loading') return <SkeletonLoader />;

  // Renderiza un spinner mientras se cargan los archivos
  if (isFilesLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );

  // Renderiza un mensaje de error si falla la carga de archivos
  if (isFilesError)
    return <div className="text-red-500 text-center">{filesError.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Archivos del Empleado</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {files?.map((file: File) => (
          <div
            key={file.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="p-4 flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <FileText className="w-6 h-6 text-blue-500 flex-shrink-0" />
                <span className="font-semibold truncate">{file.name}</span>
              </div>
              <Button onClick={() => handleFileSelect(file.id)} className="w-full">
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
