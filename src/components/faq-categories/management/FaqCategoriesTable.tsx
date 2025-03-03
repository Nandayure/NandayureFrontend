'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useGetFaqCategories from "@/hooks/faq-categories/queries/useGetFaqCategories";
import { CreateFaqCategories } from "./createFaqCategories";
import { Button } from "@/components/ui/button";
import { AlertCircle, PlusIcon, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function FaqCategoriesList() {
  const { faqCategories = [], isLoading, isError, error, refetch } = useGetFaqCategories();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-48" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead><Skeleton className="h-6 w-10" /></TableHead>
              <TableHead><Skeleton className="h-6 w-24" /></TableHead>
              <TableHead><Skeleton className="h-6 w-20" /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell><Skeleton className="h-6 w-10" /></TableCell>
                <TableCell><Skeleton className="h-6 w-full" /></TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-end">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error al cargar categorías</AlertTitle>
        <AlertDescription>
          <div className="flex flex-col space-y-2">
            <p>{error instanceof Error ? error.message : 'Ha ocurrido un error al cargar las categorías de FAQ'}</p>
            <div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                className="mt-2"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reintentar
              </Button>
            </div>
          </div>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between gap-4">
        <CreateFaqCategories>
          <Button variant={'default'}>
            <PlusIcon size={16} className="mr-2" />
            <span>
              Agregar categoría
            </span>
          </Button>
        </CreateFaqCategories>
        {/* Aqui va el search bar */}
      </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10%]">ID</TableHead>
            <TableHead className="w-[70%]">Nombre</TableHead>
            <TableHead className="w-[20%] text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {faqCategories?.length > 0 ? faqCategories?.map((faqCategory) => (
            <TableRow key={faqCategory.id}>
              <TableCell>{faqCategory.id}</TableCell>
              <TableCell>{faqCategory.name}</TableCell>
              <TableCell className="text-right">
                {/* Aqui van los botones de editar y eliminar */}
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-8">No hay categorías de FAQ</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div >
  )
}