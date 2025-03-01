'use client'

import AddBudgetCodesModal from "@/components/system-configuration/budget-codes/add-budget-codes-modal"
import BudgetCodesTable from "@/components/system-configuration/budget-codes/budget-codes-table"
import AddDepartmentProgramModal from "@/components/system-configuration/departments-programs/add-department-program-modal"
import DepartmentProgramsTable from "@/components/system-configuration/departments-programs/department-programs-table"
import AddDepartmentModal from "@/components/system-configuration/departments/add-department-modal"
import DepartmentsTable from "@/components/system-configuration/departments/departments-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Suspense } from "react"


export default function DepartmentsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Configuración del Sistema</h1>
      <Tabs defaultValue="departments">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="departments">Departamentos</TabsTrigger>
          <TabsTrigger value="programs">Programas Departamentales</TabsTrigger>
          <TabsTrigger value="budget-codes">Códigos de Presupuesto</TabsTrigger>
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
        <TabsContent value="budget-codes">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Configuración de Códigos de Presupuesto</h2>
            <Suspense fallback={<div>Cargando...</div>}>
              <BudgetCodesTable />
            </Suspense>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}