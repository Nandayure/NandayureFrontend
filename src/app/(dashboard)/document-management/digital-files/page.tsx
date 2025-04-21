import { Suspense } from "react";
import EmployeeTable from "@/components/document-management/digital-files/EmployeeTable";
import { PageHeader } from "@/components/ui/section-title";

const DocumentManagementDigitalFilesPage = () => {
  return (
    <div className="container mx-auto py-10">
      <PageHeader
        title="Expedientes de Empleados"
        description="Acceda y gestione la documentación oficial de los colaboradores."
      />
      <Suspense fallback={<div>Cargando tabla...</div>}>
        <EmployeeTable />
      </Suspense>
    </div>
  );
};

export default DocumentManagementDigitalFilesPage;
