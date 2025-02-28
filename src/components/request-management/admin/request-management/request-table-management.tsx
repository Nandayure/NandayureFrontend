"use client"
import { useGetAllRequest } from "@/hooks"
import { useState, useMemo } from "react"
import RequestTable from "./request-table"
import RequestModal from "./request-modal"
import { useDebounce } from "@/hooks/common/useDebounce"
import SearchBar from "./search-bar/search-bar"
import TypeSelector from "./type-selector/type-selector"
import type { RequestDetails } from "@/types/request-management/commonTypes"
import { PaginationController } from "@/components/ui/pagination-controller"

export default function RequestTableManagement() {
  const [selectedRequest, setSelectedRequest] = useState<RequestDetails | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedState, setSelectedState] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage] = useState<number>(10)

  const debouncedSearchQuery = useDebounce<string>(searchQuery, 500)
  const debouncedSelectedType = useDebounce<string>(selectedType, 500)
  const debouncedSelectedState = useDebounce<string>(selectedState, 500)

  const { allRequests, isLoading } = useGetAllRequest()

  const types = {
    1: "Vacaciones",
    2: "Constancia salarial",
    3: "Boletas de pago",
  }

  const states = {
    "1": "Pendiente",
    "2": "Aprobado",
    "3": "Rechazado",
  }

  const handleRowClick = (request: RequestDetails) => {
    setSelectedRequest(request)
  }

  const handleCloseModal = () => {
    setSelectedRequest(null)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Opcional: hacer scroll al inicio de la tabla
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const filteredRequests = useMemo(() => {
    let filtered = allRequests || []
    if (debouncedSearchQuery) {
      filtered = filtered.filter((request) =>
        request.EmployeeId.toString().toLowerCase().includes(debouncedSearchQuery.toLowerCase()),
      )
    }

    if (debouncedSelectedType !== "all") {
      filtered = filtered.filter((request) => request.RequestTypeId.toString() === debouncedSelectedType)
    }

    if (debouncedSelectedState !== "all") {
      filtered = filtered.filter((request) => request.RequestStateId.toString() === debouncedSelectedState)
    }

    filtered.sort((a, b) => b.id - a.id)

    return filtered
  }, [allRequests, debouncedSearchQuery, debouncedSelectedType, debouncedSelectedState])

  // Calcular los elementos a mostrar en la página actual
  const paginatedRequests = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredRequests.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredRequests, currentPage, itemsPerPage])

  // Cuando cambian los filtros, volver a la primera página
  useMemo(() => {
    setCurrentPage(1)
  }, [debouncedSearchQuery, debouncedSelectedType, debouncedSelectedState])

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4">Gestión de solicitudes</h1>
        <div className="flex space-x-4 justify-center items-center">
          <TypeSelector types={states} selectedType={selectedState} onChange={setSelectedState} label="Estado" />
          <TypeSelector types={types} selectedType={selectedType} onChange={setSelectedType} label="Tipo" />
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
      </div>
      <RequestTable requests={paginatedRequests} onRowClick={handleRowClick} isLoading={isLoading} />

      {/* Componente de paginación */}
      <div className="mt-4">
        <PaginationController
          totalItems={filteredRequests.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          siblingCount={1}
          className="mt-4"
        />
      </div>

      <RequestModal request={selectedRequest} isOpen={!!selectedRequest} onClose={handleCloseModal} />
    </div>
  )
}

