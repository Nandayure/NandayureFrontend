'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useGetFaqCategories from "@/hooks/faq-categories/queries/useGetFaqCategories";
import { Button } from "@/components/ui/button";
import { AlertCircle, Pencil, PlusIcon, RefreshCw, Trash2Icon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CreateFaqCategory } from "./createFaqCategory";
import UpdateFaqCategory from "./updateFaqCategory";
import DeleteFaqCategory from "./deleteFaqCategory";
import { useSearchFilter } from "@/hooks/use-search-filter";
import { useEffect, useState } from "react";
import { SearchBar } from "@/components/ui/search-bar";
import { PaginationController } from "@/components/ui/pagination-controller";

export default function FaqCategoriesList() {
  const [currentPage, setCurrentPage] = useState(1)
  const { faqCategories = [], isLoading, isError, error, refetch } = useGetFaqCategories();
  const { filteredData: filteredFaqCategories, setSearchValue } = useSearchFilter({
    data: faqCategories,
    searchFields: ["id", "name"],
  })

  useEffect(() => {
    setCurrentPage(1)
  }, [])

  const itemsPerPage = 5
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentFaqCategories = filteredFaqCategories.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handleSearch = (value: string) => {
    setSearchValue(value)
  }

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
        <CreateFaqCategory>
          <Button>
            <PlusIcon size={16} className="mr-2" />
            <span>
              Agregar categoría
            </span>
          </Button>
        </CreateFaqCategory>

        <SearchBar onSearch={handleSearch} placeholder="Buscar departamentos..." className="max-w-md" />
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
          {currentFaqCategories?.length > 0 ? currentFaqCategories?.map((faqCategory) => (
            <TableRow key={faqCategory.id}>
              <TableCell>{faqCategory.id}</TableCell>
              <TableCell>{faqCategory.name}</TableCell>
              <TableCell className="flex space-x-2 justify-end">
                <UpdateFaqCategory FaqCategory={faqCategory}>
                  <Button size={'icon'} variant={'outline'}>
                    <Pencil size={16} />
                  </Button>
                </UpdateFaqCategory>
                <DeleteFaqCategory faqCategory={faqCategory}>
                  <Button size={'icon'} variant={'outline'}>
                    <Trash2Icon size={16} />
                  </Button>
                </DeleteFaqCategory>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-8">No hay categorías de FAQ</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {!isLoading && filteredFaqCategories.length > 0 && (
        <PaginationController
          totalItems={filteredFaqCategories.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          siblingCount={1}
          className="mt-4"
        />
      )}
    </div >
  )
}