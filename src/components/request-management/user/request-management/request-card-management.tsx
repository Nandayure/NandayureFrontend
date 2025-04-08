"use client"

import useGetAllRequestById from "@/hooks/request-management/useGetAllRequestById"
import type { UseGetAllRequestParams } from "@/hooks/request-management/useGetAllRequestById"
import { useState } from "react"
import RequestCard from "./request-card"
import RequestModal from "./request-modal"
import SkeletonLoader from "@/components/ui/skeleton-loader"
import type { RequestDetails } from "@/types/request-management/commonTypes"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { InboxIcon } from "lucide-react"
import NoRequest from "./no-request"
import RequestFilters from "./request-filters"
import type { FilterValue } from "./request-filters"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { PaginationController } from "@/components/ui/pagination-controller"

export default function RequestCardManagement() {
  const [selectedRequest, setSelectedRequest] = useState<RequestDetails | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<FilterValue>({
    types: [],
    states: [],
    startDate: null,
    endDate: null,
  })

  const params: UseGetAllRequestParams = {
    page: currentPage,
    limit: 10,
    RequestTypeId: filters.types[0],
    RequestStateId: filters.states[0],
    startDate: filters.startDate?.toISOString(),
    endDate: filters.endDate?.toISOString(),
  }

  const { data, isLoading } = useGetAllRequestById(params)

  const requests = data?.data || []
  const totalItems = data?.totalItems || 0
  const itemsPerPage = data?.limit || 10

  const handleRequestClick = (request: RequestDetails) => {
    setSelectedRequest(request)
  }

  const handleCloseModal = () => {
    setSelectedRequest(null)
  }

  const handleFilterChange = (newFilters: FilterValue) => {
    setFilters(newFilters)
    setCurrentPage(1) // Reset to first page when filters change
  }

  const clearFilters = () => {
    setFilters({
      types: [],
      states: [],
      startDate: null,
      endDate: null,
    })
    setCurrentPage(1)
  }

  if (isLoading) {
    return <SkeletonLoader />
  }

  return (
    <div className="space-y-4 container mx-auto px-6">
      <div className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <CardTitle className="flex items-center gap-2">
            <InboxIcon className="h-6 w-6" />
            Mis Solicitudes
          </CardTitle>
        </div>
        <RequestFilters
          activeFilters={filters}
          onFilterChange={handleFilterChange}
          clearFilters={clearFilters}
        />
      </div>

      {requests.length === 0 ? (
        <NoRequest />
      ) : (
        <>
          <AnimatePresence>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {requests.map((request: RequestDetails, index: number) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                  <RequestCard
                    requests={[request]}
                    isLoading={false}
                    onClick={handleRequestClick}
                  />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {requests.length > 0 && (
            <div className="flex justify-center mt-4">
              <PaginationController
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                siblingCount={1}
                className="mt-4"
              />
            </div>
          )}
        </>
      )}

      {selectedRequest && (
        <RequestModal
          request={selectedRequest}
          isOpen={!!selectedRequest}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

