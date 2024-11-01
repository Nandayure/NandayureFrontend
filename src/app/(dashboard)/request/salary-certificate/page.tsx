import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Carga dinámica de SalaryCertificatesForm y MaintenancePage con Suspense
const SalaryCertificatesForm = dynamic(() => import('@/components/request/salary-certificates/salary-certificates-form'), { suspense: true });
const MaintenancePage = dynamic(() => import('@/components/ui/maintenance-page'), { suspense: true });

const SalaryCertificate = () => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white border shadow-md rounded-lg overflow-hidden p-6">
        <Suspense fallback={<div>Cargando formulario de certificados salariales...</div>}>
          <SalaryCertificatesForm />
        </Suspense>
      </div>
    </div>
  );
};

export default SalaryCertificate;
