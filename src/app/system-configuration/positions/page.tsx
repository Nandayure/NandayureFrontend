import JobPositionsTable from '@/components/system-configuration/job-positions/job-positions-table';
import { SectionHeader } from '@/components/ui/section-header';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';

export default function PositionsPage() {
  return (
    <div>
      <div className="container mx-auto py-10">
        <SectionHeader
          title="Administración de Puestos de Trabajo"
          description="Aquí puedes gestionar los puestos de trabajo de tu aplicación. Puedes deshabilitar o habilitar según sea necesario."
        >
        </SectionHeader>

        <Separator className="my-6" />
        <Suspense fallback={<div>Cargando...</div>}>
          <JobPositionsTable />
        </Suspense>
      </div>
    </div>
  );
}
