'use client'

import SkeletonLoader from "@/components/ui/skeleton-loader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useGetFaqCategories from "@/hooks/faq-categories/queries/useGetFaqCategories";

export default function FaqCategoriesList() {
  const { faqCategories = [], isLoading, isError } = useGetFaqCategories();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
      </div>
    )
  }

  if (isError) {
    return <div>Ha ocurrido un error</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        {/* Aqui va el add button y el search bar */}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {faqCategories?.length > 0 ? faqCategories?.map((faqCategory) => (
            <TableRow key={faqCategory.id}>
              <TableCell>{faqCategory.id}</TableCell>
              <TableCell>{faqCategory.name}</TableCell>
              <TableCell>
                {/* Aqui van los botones de editar y eliminar */}
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={2}>No hay categorías de FAQ</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div >
  )
}