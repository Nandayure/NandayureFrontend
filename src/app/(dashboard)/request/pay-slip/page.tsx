import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Carga dinámica de PaySlipForm con Suspense para mostrar un fallback mientras se carga
const PaySlipForm = dynamic(() => import('@/components/request/pay-slip/pay-slip-form'), {
  ssr: false,
  loading: () => <div>Cargando formulario de recibo de pago...</div>
});

const PaySlip = () => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white border shadow-md rounded-lg overflow-hidden p-6">
        <Suspense fallback={<div>Cargando formulario de recibo de pago...</div>}>
          <PaySlipForm />
        </Suspense>
      </div>
    </div>
  );
};

export default PaySlip;
