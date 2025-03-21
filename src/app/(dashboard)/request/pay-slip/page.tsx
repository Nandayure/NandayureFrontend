import PaySlipForm from "@/components/request/pay-slip/pay-slip-form";
import { Suspense } from "react";


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
