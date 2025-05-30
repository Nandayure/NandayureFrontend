"use client"
import { useGetAllEmployees, useGetAllRequest } from "@/hooks"
import { useState, useMemo } from "react"
import RequestTable from "./request-table"
import RequestModal from "./request-modal"
import SearchBar from "./search-bar/search-bar"
import TypeSelector from "./type-selector/type-selector"
import type { RequestDetails } from "@/types/request-management/commonTypes"
import { PaginationController } from "@/components/ui/pagination-controller"
import ExportButtons from "./export-buttons"
import { useRouter, useSearchParams } from "next/navigation"
import ItemsPerPageSelector from "./items-per-page-selector"
import RequestTableSkeleton from "./request-table-skeleton"

export default function RequestTableManagement() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Leer filtros desde la URL
  const getParam = (key: string, fallback: string) => searchParams.get(key) || fallback
  const [selectedRequest, setSelectedRequest] = useState<RequestDetails | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>(getParam("q", ""))
  const [selectedType, setSelectedType] = useState<string>(getParam("type", "all"))
  const [selectedState, setSelectedState] = useState<string>(getParam("state", "all"))
  const [currentPage, setCurrentPage] = useState<number>(Number(getParam("page", "1")))
  const [itemsPerPage, setItemsPerPage] = useState<number>(Number(getParam("limit", "10")))
  const [startDate, setStartDate] = useState<string>(getParam("startDate", ""))
  const [endDate, setEndDate] = useState<string>(getParam("endDate", ""))
  const [employeeId, setEmployeeId] = useState<string>(getParam("employeeId", ""))

  // Actualizar los params de la URL
  const updateUrlParams = (params: Record<string, string | number | undefined>) => {
    const url = new URL(window.location.href)
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === "" || value === "all") {
        url.searchParams.delete(key)
      } else {
        url.searchParams.set(key, String(value))
      }
    })
    router.push(url.pathname + url.search)
  }

  // Handlers para filtros
  const handleTypeChange = (type: string) => {
    setSelectedType(type)
    setCurrentPage(1)
    updateUrlParams({ type, page: 1 })
  }
  const handleStateChange = (state: string) => {
    setSelectedState(state)
    setCurrentPage(1)
    updateUrlParams({ state, page: 1 })
  }
  const handleSearchChange = (q: string) => {
    setSearchQuery(q)
    setCurrentPage(1)
    updateUrlParams({ q, page: 1 })
  }
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    updateUrlParams({ page })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const handleItemsPerPageChange = (limit: number) => {
    setItemsPerPage(limit)
    setCurrentPage(1)
    updateUrlParams({ limit, page: 1 })
  }
  const handleStartDateChange = (date: string) => {
    setStartDate(date)
    setCurrentPage(1)
    updateUrlParams({ startDate: date, page: 1 })
  }
  const handleEndDateChange = (date: string) => {
    setEndDate(date)
    setCurrentPage(1)
    updateUrlParams({ endDate: date, page: 1 })
  }
  const handleEmployeeChange = (id: string) => {
    setEmployeeId(id)
    setCurrentPage(1)
    updateUrlParams({ employeeId: id, page: 1 })
  }

  const { allRequests, isLoading, pagination } = useGetAllRequest({
    page: currentPage,
    limit: itemsPerPage,
    RequestTypeId: selectedType !== "all" ? Number(selectedType) : undefined,
    RequestStateId: selectedState !== "all" ? Number(selectedState) : undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
    EmployeeId: employeeId || undefined,
    searchQuery: searchQuery || undefined,
  })

  const { employees } = useGetAllEmployees()

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

  // No necesitamos enriquecer las solicitudes ya que vienen con los datos del empleado
  const enrichedRequests = useMemo(() => {
    return allRequests
  }, [allRequests])

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4">Gestión de solicitudes</h1>
        <div className="flex space-x-4 justify-center items-center">
          <TypeSelector types={states} selectedType={selectedState} onChange={handleStateChange} label="Estado" />
          <TypeSelector types={types} selectedType={selectedType} onChange={handleTypeChange} label="Tipo" />
          <SearchBar searchQuery={searchQuery} setSearchQuery={handleSearchChange} />
        </div>
      </div>
      {/* Tabla o Skeleton según el estado de carga */}
      {isLoading ? (
        <RequestTableSkeleton itemCount={itemsPerPage} />
      ) : (
        <RequestTable requests={enrichedRequests} onRowClick={handleRowClick} isLoading={isLoading} />
      )}

      {/* Controles de paginación reorganizados */}
      <div className="mt-4 w-full grid grid-cols-3 items-center">
        <div>
          <ItemsPerPageSelector value={itemsPerPage} onChange={handleItemsPerPageChange} />
        </div>
        <div className="flex justify-center">
          <PaginationController
            totalItems={pagination.totalItems}
            itemsPerPage={pagination.limit}
            currentPage={pagination.page}
            onPageChange={handlePageChange}
            siblingCount={1}
          />
        </div>
        <div></div>
      </div>

      <RequestModal request={selectedRequest} isOpen={!!selectedRequest} onClose={handleCloseModal} />
    </div>
  )
}
