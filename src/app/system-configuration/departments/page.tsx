'use client';
import AddDepartmentProgramModal from '@/components/system-configuration/departments-programs/add-department-program-modal';
import DepartmentProgramsTable from '@/components/system-configuration/departments-programs/department-programs-table';
import AddDepartamenModal from '@/components/system-configuration/departments/add-department-modal';
import DepartmentsTable from '@/components/system-configuration/departments/departments-table';
export default function DepartmentsPage() {
  return (
    <div>
      <div className="container mx-auto py-10">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold mb-4">
            Configuración de departamentos
          </h1>
        </div>
        <AddDepartamenModal />
        <DepartmentsTable />
      </div>
      <div className="container mx-auto py-10">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold mb-4">
            Configuración de programas de departamentales
          </h1>
        </div>
        <AddDepartmentProgramModal />
        <DepartmentProgramsTable />
      </div>
    </div>
  );
}
