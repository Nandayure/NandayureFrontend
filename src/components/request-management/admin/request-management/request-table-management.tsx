'use client';
import { useGetAllRequest } from '@/hooks';
import { RequestDetails } from '@/types';
import { useState, useMemo } from 'react';
import RequestTable from './request-table';
import RequestModal from './request-modal';
import { useDebounce } from '@/hooks/common/useDebounce';
import SearchBar from './search-bar/search-bar';
import TypeSelector from './type-selector/type-selector';
import { XCircle } from 'lucide-react';

export default function RequestTableManagement() {
  const [selectedRequest, setSelectedRequest] = useState<RequestDetails | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');
  const debouncedSearchQuery = useDebounce<string>(searchQuery, 500);
  const { allRequests, isLoading } = useGetAllRequest();

  const types = {
    '1': 'Vacaciones',
    '2': 'Certificado de Salario',
    '3': 'Boletas de Pago',
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

  const handleClearFilters = () => {
    setSelectedType('all');
    setSelectedState('all');
    setSearchQuery('');
  };

  const filteredRequests = useMemo(() => {
    let filtered = allRequests || [];

    if (debouncedSearchQuery) {
      filtered = filtered.filter((request) =>
        request.EmployeeId.toString()
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase()),
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(
        (request) => request.RequestTypeId.toString() === selectedType,
      );
    }

    if (selectedState !== 'all') {
      filtered = filtered.filter(
        (request) => request.RequestStateId.toString() === selectedState,
      );
    }

    // Ordenar las solicitudes por id en orden descendente
    filtered.sort((a, b) => b.id - a.id);

    return filtered;
  }, [allRequests, debouncedSearchQuery, selectedType, selectedState]);

  const isFilterActive =
    selectedType !== 'all' || selectedState !== 'all' || searchQuery !== '';

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4">Gestión de Solicitudes</h1>
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
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          {isFilterActive && (
            <button
              onClick={handleClearFilters}
              className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
            >
              <XCircle className="w-4 h-4" />
              <span>Limpiar filtros</span>
            </button>
          )}
        </div>
      </div>
      <RequestTable
        requests={filteredRequests}
        onRowClick={handleRowClick}
        isLoading={isLoading}
      />
      <RequestModal
        request={selectedRequest}
        isOpen={!!selectedRequest}
        onClose={handleCloseModal}
      />
    </div>
  );
}
