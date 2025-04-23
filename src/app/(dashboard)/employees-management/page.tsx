'use client'

import EmployeesDashboard from "@/components/employees-management/employees-dasboard";
import { SectionHeader } from "@/components/ui/section-header";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6">
      <SectionHeader
        title="Administración de Empleados"
        description="Aquí puedes gestionar los empleados de tu aplicación. Puedes editar los datos de los empleados según sea necesario."
      >
      </SectionHeader>

      <Separator className="my-6" />

      <Suspense fallback={<div>Cargando empleados...</div>}>
        <EmployeesDashboard />
      </Suspense>
    </div>
  )
}
