'use client';

import { useGetAllRequestById } from '@/hooks';
import { useState } from 'react';
import RequestCard from './request-card';
import RequestModal from './request-modal';
import SkeletonLoader from '@/components/ui/skeleton-loader';
import { RequestDetails } from '@/types/request-management/commonTypes';

export default function RequestCardManagement() {
  const [selectedRequest, setSelectedRequest] = useState<RequestDetails | null>(
    null,
  );
  const { AllRequestsById, isLoading } = useGetAllRequestById(); // Assuming isLoading is provided by the hook

  const handleRequestClick = (request: RequestDetails) => {
    setSelectedRequest(request);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Mis solicitudes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RequestCard
          requests={AllRequestsById || []}
          onClick={handleRequestClick}
          isLoading={isLoading}
        />
      </div>
      <RequestModal
        request={selectedRequest}
        isOpen={!!selectedRequest}
        onClose={handleCloseModal}
      />
    </div>
  );
}
