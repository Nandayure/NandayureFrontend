import JobPositionsTable from '@/components/system-configuration/job-positions/job-positions-table';
import { Suspense } from 'react';

export default function PositionsPage() {
  return (
    <div>
      <div className="container mx-auto py-10">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold mb-4">
            Configuración de puestos de trabajo
          </h1>
        </div>
        <Suspense fallback={<div>Cargando...</div>}>
          <JobPositionsTable />
        </Suspense>
      </div>
    </div>
  );
}
