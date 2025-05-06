"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { AlertCircle, RefreshCw, Search } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useGetAllEmployees } from "@/hooks"
import { useDebounce } from "@/hooks/use-debounce"
import { EmployeeTable } from "./employees/employee-table"
import { EmployeeDetailDialog } from "./employees/employee-detail-dialog"

export default function EmployeesDashboard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const itemsPerPage = 5

  // State for pagination and search
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1)
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "")
  const debouncedSearch = useDebounce(searchValue, 500)

  // Use the actual hook instead of mock data
  const { employees, pagination, isError, isLoading, error, refetch } = useGetAllEmployees({
    page: String(currentPage),
    limit: String(itemsPerPage),
    name: debouncedSearch || undefined,
  })

  // State for modals and dialogs
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  // Update URL when search or page changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (debouncedSearch) {
      params.set("search", debouncedSearch)
    } else {
      params.delete("search")
    }
    params.set("page", currentPage.toString())
    router.push("?" + params.toString())
  }, [debouncedSearch, currentPage, router, searchParams])

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch])

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  // Open employee detail modal
  const openEmployeeDetail = (employee: any) => {
    setSelectedEmployee(employee)
    setIsDetailModalOpen(true)
  }

  // Handle employee update
  const handleEmployeeUpdate = () => {
    refetch()
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error al cargar empleados</AlertTitle>
        <AlertDescription>
          <div className="flex flex-col space-y-2">
            <p>{error instanceof Error ? error.message : "Ha ocurrido un error al cargar los empleados"}</p>
            <div>
              <Button variant="outline" size="sm" onClick={() => refetch()} className="mt-2">
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
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar empleados..."
            className="pl-8"
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
      </div>

      <EmployeeTable
        employees={employees || []}
        pagination={pagination}
        isLoading={isLoading}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onViewEmployee={openEmployeeDetail}
      />

      {selectedEmployee && (
        <EmployeeDetailDialog
          employee={selectedEmployee}
          isOpen={isDetailModalOpen}
          onCloseAction={() => setIsDetailModalOpen(false)}
          onUpdate={handleEmployeeUpdate}
        />
      )}
    </div>
  )
}
