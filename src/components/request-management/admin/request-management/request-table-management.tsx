'use client';
import { useGetAllRequest } from '@/hooks';
import { useState, useMemo } from 'react';
import RequestTable from './request-table';
import RequestModal from './request-modal';
import { useDebounce } from '@/hooks/common/useDebounce';
import SearchBar from './search-bar/search-bar';
import TypeSelector from './type-selector/type-selector';
import { XCircle } from 'lucide-react';
import { RequestDetails } from '@/types/request-management/commonTypes';

export default function RequestTableManagement() {
  const [selectedRequest, setSelectedRequest] = useState<RequestDetails | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');
  const debouncedSearchQuery = useDebounce<string>(searchQuery, 500);
  const debouncedSelectedType = useDebounce<string>(selectedType, 500);
  const debouncedSelectedState = useDebounce<string>(selectedState, 500);

  const { allRequests, isLoading } = useGetAllRequest();

  const types = {
    1: 'Vacaciones',
    2: 'Constancia salarial',
    3: 'Boletas de pago',
  };

  const states = {
    '1': 'Pendiente',
    '2': 'Aprobado',
    '3': 'Rechazado',
  };

  const handleRowClick = (request: RequestDetails) => {
    setSelectedRequest(request);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
  };


  const filteredRequests = useMemo(() => {
    let filtered = allRequests || [];

    if (debouncedSearchQuery) {
      filtered = filtered.filter((request) =>
        request.EmployeeId.toString().toLowerCase().includes(debouncedSearchQuery.toLowerCase()),
      );
    }

    if (debouncedSelectedType !== 'all') {
      filtered = filtered.filter(
        (request) => request.RequestTypeId.toString() === debouncedSelectedType,
      );
    }

    if (debouncedSelectedState !== 'all') {
      filtered = filtered.filter(
        (request) => request.RequestStateId.toString() === debouncedSelectedState,
      );
    }

    filtered.sort((a, b) => b.id - a.id);

    return filtered;
  }, [allRequests, debouncedSearchQuery, debouncedSelectedType, debouncedSelectedState]);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4">Gestión de solicitudes</h1>
        <div className="flex space-x-4 justify-center items-center">
          <TypeSelector
            types={states}
            selectedType={selectedState}
            onChange={setSelectedState}
            label="Estado"
          />
          <TypeSelector
            types={types}
            selectedType={selectedType}
            onChange={setSelectedType}
            label="Tipo"
          />
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
      </div>
      <RequestTable requests={filteredRequests} onRowClick={handleRowClick} isLoading={isLoading} />
      <RequestModal request={selectedRequest} isOpen={!!selectedRequest} onClose={handleCloseModal} />
    </div>
  );
}
