import SalaryCertificatesForm from "@/components/request/salary-certificates/salary-certificates-form";
import { Suspense } from "react";

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
