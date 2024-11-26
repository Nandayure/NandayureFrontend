'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const AddBudgetCodesModal = dynamic(() => import('@/components/system-configuration/budget-codes/add-budget-codes-modal'), { suspense: true })
const BudgetCodesTable = dynamic(() => import('@/components/system-configuration/budget-codes/budget-codes-table'), { suspense: true })
const AddDepartmentProgramModal = dynamic(() => import('@/components/system-configuration/departments-programs/add-department-program-modal'), { suspense: true })
const DepartmentProgramsTable = dynamic(() => import('@/components/system-configuration/departments-programs/department-programs-table'), { suspense: true })
const AddDepartamenModal = dynamic(() => import('@/components/system-configuration/departments/add-department-modal'), { suspense: true })
const DepartmentsTable = dynamic(() => import('@/components/system-configuration/departments/departments-table'), { suspense: true })

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
              <AddDepartamenModal />
              <DepartmentsTable />
            </Suspense>
          </div>
        </TabsContent>
        <TabsContent value="programs">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Configuración de Programas Departamentales</h2>
            <Suspense fallback={<div>Cargando...</div>}>
              <AddDepartmentProgramModal />
              <DepartmentProgramsTable />
            </Suspense>
          </div>
        </TabsContent>
        <TabsContent value="budget-codes">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Configuración de Códigos de Presupuesto</h2>
            <Suspense fallback={<div>Cargando...</div>}>
              <AddBudgetCodesModal />
              <BudgetCodesTable />
            </Suspense>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}