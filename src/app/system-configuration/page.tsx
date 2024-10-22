'use client'
import AddCivilStatusModal from "@/components/system-configuration/management-civil/add-civilStatus-modal";
import CivilStatusTable from "@/components/system-configuration/management-civil/civilStatus-table";
 

export default function SystemConfigurationPage() {
  return (
    <div>
    <div className="container mx-auto py-10">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4">
          Configuración de estado civil
        </h1>
      </div>
      <AddCivilStatusModal />
      <CivilStatusTable />
    </div>
    </div>
  );
}
