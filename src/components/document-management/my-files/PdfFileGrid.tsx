'use client'

import React from 'react';
import SkeletonLoader from '../SkeletonLoader';
import FileCard from '../FileCard';
import { PdfFile } from '@/types/files/file';
import { GetFilesFilterDto } from '@/types/files/filterTypes';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

type OrderByType = NonNullable<GetFilesFilterDto['orderBy']>;
type OrderDirectionType = NonNullable<GetFilesFilterDto['orderDirection']>;

type PdfFileGridProps = {
  files: PdfFile[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  hideDeleteButton?: boolean;
  total?: number;
  filters?: GetFilesFilterDto;
  updateFilters?: (filters: Partial<GetFilesFilterDto>) => void;
  loadNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
};

const PdfFileGrid = ({
  files,
  isError,
  isLoading,
  error,
  hideDeleteButton = false,
  total = 0,
  filters,
  updateFilters,
  loadNextPage,
  hasNextPage,
  isFetchingNextPage
}: PdfFileGridProps) => {
  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (isError) {
    return <div className="text-red-500 text-center">{error?.message || 'An error occurred'}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Filtros */}
      {updateFilters && (
        <div className="mb-6 flex flex-wrap gap-4">
          <Input
            placeholder="Buscar por nombre..."
            value={filters?.name || ''}
            onChange={(e) => updateFilters({ name: e.target.value })}
            className="w-full md:w-64"
          />
          <Select
            value={filters?.orderBy || 'modifiedTime'}
            onValueChange={(value: OrderByType) => updateFilters({ orderBy: value })}
          >
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modifiedTime">Fecha de modificación</SelectItem>
              <SelectItem value="name">Nombre</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={filters?.orderDirection || 'desc'}
            onValueChange={(value: OrderDirectionType) => updateFilters({ orderDirection: value })}
          >
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Dirección" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascendente</SelectItem>
              <SelectItem value="desc">Descendente</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Grid de archivos */}
      {files && Array.isArray(files) && files.length > 0 ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {files.map((file) => (
              <FileCard key={file.id} file={file} hideDelete={hideDeleteButton} />
            ))}
          </div>

          {/* Paginación */}
          {loadNextPage && hasNextPage && (
            <div className="mt-8 flex justify-center">
              <Button
                onClick={loadNextPage}
                disabled={isFetchingNextPage}
                variant="outline"
                className="min-w-[200px]"
              >
                {isFetchingNextPage ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Cargando...
                  </>
                ) : (
                  'Cargar más'
                )}
              </Button>
            </div>
          )}

          {/* Total de archivos */}
          {total > 0 && (
            <div className="text-center text-sm text-muted-foreground mt-4">
              Total: {total} archivos
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500">No se encontraron archivos.</div>
      )}
    </div>
  );
};

export default PdfFileGrid;