'use client'

import AddDepartmentProgramModal from "@/components/system-configuration/departments-programs/add-department-program-modal"
import DepartmentProgramsTable from "@/components/system-configuration/departments-programs/department-programs-table"
import AddDepartmentModal from "@/components/system-configuration/departments/add-department-modal"
import DepartmentsTable from "@/components/system-configuration/departments/departments-table"
import { SectionHeader } from "@/components/ui/section-header"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Suspense } from "react"


export default function DepartmentsPage() {
  return (
    <div className="container mx-auto py-10">
      <SectionHeader
        title="Administración de Usuarios"
        description="Aquí puedes gestionar los usuarios de tu aplicación. Puedes deshabilitar o habilitar según sea necesario."
      >
      </SectionHeader>

      <Separator className="my-6" />
      <Tabs defaultValue="departments">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="departments">Departamentos</TabsTrigger>
          <TabsTrigger value="programs">Programas Departamentales</TabsTrigger>
        </TabsList>
        <TabsContent value="departments">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Configuración de Departamentos</h2>
            <Suspense fallback={<div>Cargando...</div>}>
              <DepartmentsTable />
            </Suspense>
          </div>
        </TabsContent>
        <TabsContent value="programs">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Configuración de Programas Departamentales</h2>
            <Suspense fallback={<div>Cargando...</div>}>
              <DepartmentProgramsTable />
            </Suspense>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}