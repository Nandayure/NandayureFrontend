'use client';

import { useState, useEffect } from 'react';

// Definición de tipos para los datos
interface RequestType {
  name: string;
  total: number;
  percentage: number;
}

interface RequestStatus {
  status: string;
  total: number;
}

interface RequestData {
  vacationRequests: RequestType;
  salaryCertificateRequests: RequestType;
  paymentConfirmationRequests: RequestType;
  totalApproved: RequestStatus;
  totalRejected: RequestStatus;
  totalPending: RequestStatus;
  totalRequests: number;
  lastUpdated: string;
}

// Datos de ejemplo (los mismos proporcionados en el JSON)
const sampleData: RequestData = {
  vacationRequests: {
    name: 'Vacaciones',
    total: 13,
    percentage: 46.42857142857143,
  },
  salaryCertificateRequests: {
    name: 'Constancia salarial',
    total: 7,
    percentage: 25,
  },
  paymentConfirmationRequests: {
    name: 'Boleta de pago',
    total: 8,
    percentage: 28.57142857142857,
  },
  totalApproved: {
    status: 'Aprovada',
    total: 19,
  },
  totalRejected: {
    status: 'Rechazada',
    total: 5,
  },
  totalPending: {
    status: 'Pendiente',
    total: 4,
  },
  totalRequests: 28,
  lastUpdated: '2025-03-10T03:22:18.484Z',
};

/**
 * Hook personalizado para manejar los datos de solicitudes
 *
 * Este hook simula la carga de datos desde una API y proporciona
 * estados para manejar la carga y los errores.
 */
export function useRequestData() {
  const [data, setData] = useState<RequestData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      // En un caso real, aquí haríamos un fetch a una API
      // Por ahora, simulamos un retraso y usamos los datos de muestra
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setData(sampleData);
      setIsLoading(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error('Error desconocido al cargar datos'),
      );
      setIsLoading(false);
    }
  };

  const refreshData = async () => {
    setIsLoading(true);
    setError(null);
    return fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data: data as RequestData,
    isLoading,
    error,
    refreshData,
  };
}
