'use client'
import AddDepartamenModal from '@/components/system-configuration/departments/add-department-form';
import DepartmentsTable from '@/components/system-configuration/departments/departments-table';
export default function DepartmentsPage() {
  return (
    <div>
      <div className="container mx-auto py-10">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold mb-4">
            Configuración de departamentos
          </h1>
          <div className="flex space-x-4 justify-center items-center"></div>
        </div>
        <AddDepartamenModal />
        <DepartmentsTable />
      </div>
    </div>
  );
}
