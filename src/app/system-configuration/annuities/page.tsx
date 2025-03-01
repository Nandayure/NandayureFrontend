'use client';

import AddAnnuityModal from '@/components/system-configuration/annuities/AddAnnuityModal';
import AnnuitiesTable from '@/components/system-configuration/annuities/AnnuitiesTable';

export default function AnnuitiesPage() {
  return (
    <div>
      <div className="container mx-auto py-10">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold mb-4">Configuración de Anualidades</h1>
        </div>
        {/* Tabla para mostrar las anualidades */}
        <AnnuitiesTable />
      </div>
    </div>
  );
}
