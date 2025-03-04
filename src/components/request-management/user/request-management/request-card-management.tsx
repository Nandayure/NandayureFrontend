"use client"

import { useGetAllRequestById } from "@/hooks"
import { useState, useMemo } from "react"
import RequestCard from "./request-card"
import RequestModal from "./request-modal"
import SkeletonLoader from "@/components/ui/skeleton-loader"
import type { RequestDetails } from "@/types/request-management/commonTypes"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { InboxIcon } from "lucide-react"
import NoRequest from "./no-request"
import RequestFilters, { type FilterValue } from "./request-filters"
import { motion, AnimatePresence } from "framer-motion" // Import framer-motion

export default function RequestCardManagement() {
  const [selectedRequest, setSelectedRequest] = useState<RequestDetails | null>(null)
  const { AllRequestsById, isLoading } = useGetAllRequestById()

  // Filter state
  const [filters, setFilters] = useState<FilterValue>({
    types: [],
    states: [],
    startDate: null,
    endDate: null,
  })

  const handleRequestClick = (request: RequestDetails) => {
    setSelectedRequest(request)
  }

  const handleCloseModal = () => {
    setSelectedRequest(null)
  }

  const handleFilterChange = (newFilters: FilterValue) => {
    setFilters(newFilters)
  }

  const clearFilters = () => {
    setFilters({
      types: [],
      states: [],
      startDate: null,
      endDate: null,
    })
  }

  // Filter requests based on selected filters
  const filteredRequests = useMemo(() => {
    if (!AllRequestsById) return []

    return AllRequestsById.filter((request) => {
      // Filter by type
      if (filters.types.length > 0 && !filters.types.includes(request.RequestTypeId)) {
        return false
      }

      // Filter by state
      if (filters.states.length > 0 && !filters.states.includes(request.RequestStateId)) {
        return false
      }

      // Filter by date range
      if (filters.startDate || filters.endDate) {
        const requestDate = new Date(request.date)

        if (filters.startDate && requestDate < filters.startDate) {
          return false
        }

        if (filters.endDate) {
          // Set time to end of day for end date comparison
          const endDate = new Date(filters.endDate)
          endDate.setHours(23, 59, 59, 999)

          if (requestDate > endDate) {
            return false
          }
        }
      }

      return true
    })
  }, [AllRequestsById, filters])

  // Check if we have requests after filtering
  const hasFilteredRequests = filteredRequests.length > 0
  const hasRequests = AllRequestsById && AllRequestsById.length > 0

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">Mis solicitudes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      </div>
    )
  }

  if (!hasRequests) {
    return <NoRequest />
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Mis solicitudes</h1>

      {/* Filters */}
      <RequestFilters onFilterChange={handleFilterChange} activeFilters={filters} clearFilters={clearFilters} />

      {/* Filter results summary */}
      {(filters.types.length > 0 || filters.states.length > 0 || filters.startDate || filters.endDate) && (
        <div className="mb-4 text-sm text-muted-foreground">
          Mostrando {filteredRequests.length} de {AllRequestsById.length} solicitudes
        </div>
      )}

      {/* Request cards with animation */}
      {hasFilteredRequests ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {filteredRequests.map((request, index) => (
              <motion.div
                key={request.id}
                layout
                initial={{ opacity: 0, x: 40, y: 40, scale: 1.1 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -40, y: -40, scale: 0.95 }}
                transition={{
                  duration: 0.4,
                  ease: [0.2, 0, 0.3, 1],
                  delay: index * 0.05
                }}
                className="col-span-1"
              >
                <RequestCard
                  requests={[request]}
                  onClick={handleRequestClick}
                  isLoading={false}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <Card className="w-full p-6 text-center">
          <CardContent className="pt-6 flex flex-col items-center">
            <InboxIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <CardTitle className="text-xl mb-2">No se encontraron solicitudes</CardTitle>
            <p className="text-muted-foreground">
              No hay solicitudes que coincidan con los filtros seleccionados. Intenta ajustar tus filtros.
            </p>
          </CardContent>
        </Card>
      )}

      <RequestModal request={selectedRequest} isOpen={!!selectedRequest} onClose={handleCloseModal} />
    </div>
  )
}

