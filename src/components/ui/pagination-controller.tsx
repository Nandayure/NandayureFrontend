"use client"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export interface PaginationControllerProps {
  /**
   * Número total de elementos
   */
  totalItems: number
  /**
   * Número de elementos por página
   */
  itemsPerPage: number
  /**
   * Página actual
   */
  currentPage: number
  /**
   * Función para cambiar de página
   */
  onPageChange: (page: number) => void
  /**
   * Número de páginas a mostrar antes y después de la página actual
   * @default 1
   */
  siblingCount?: number
  /**
   * Clase CSS adicional
   */
  className?: string
}

export function PaginationController({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  siblingCount = 1,
  className,
}: PaginationControllerProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  // No mostrar paginación si solo hay una página
  if (totalPages <= 1) return null

  // Función para generar el rango de páginas a mostrar
  const generatePagination = () => {
    // Siempre mostrar la primera página
    const firstPage = 1
    // Siempre mostrar la última página
    const lastPage = totalPages

    // Calcular el rango de páginas a mostrar alrededor de la página actual
    let startPage = Math.max(2, currentPage - siblingCount)
    let endPage = Math.min(lastPage - 1, currentPage + siblingCount)

    // Ajustar el rango si estamos cerca del inicio o del final
    if (currentPage - siblingCount <= 2) {
      endPage = Math.min(lastPage - 1, 1 + siblingCount * 2)
    }

    if (currentPage + siblingCount >= lastPage - 1) {
      startPage = Math.max(2, lastPage - siblingCount * 2)
    }

    // Generar el array de páginas
    const pages = []

    // Siempre añadir la primera página
    pages.push(1)

    // Añadir elipsis si es necesario
    if (startPage > 2) {
      pages.push("ellipsis-start")
    }

    // Añadir las páginas del medio
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    // Añadir elipsis si es necesario
    if (endPage < lastPage - 1) {
      pages.push("ellipsis-end")
    }

    // Añadir la última página si hay más de una página
    if (lastPage > 1) {
      pages.push(lastPage)
    }

    return pages
  }

  const pages = generatePagination()

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault()
              onPageChange(currentPage - 1)
            }}
            disabled={currentPage === 1}
            href="#"
          />
        </PaginationItem>

        {pages.map((page, index) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }

          return (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault()
                  onPageChange(page as number)
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault()
              onPageChange(currentPage + 1)
            }}
            disabled={currentPage === totalPages}
            href="#"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

