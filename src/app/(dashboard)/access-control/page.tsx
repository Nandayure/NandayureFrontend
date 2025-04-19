'use client'

import { SectionHeader } from "@/components/ui/section-header";
import { Separator } from "@/components/ui/separator";
import { UserDashboard } from "@/components/user/user-dashboard";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6">
      <SectionHeader
        title="Administración de Usuarios"
        description="Aquí puedes gestionar los usuarios de tu aplicación. Puedes deshabilitar o habilitar según sea necesario."
      >
      </SectionHeader>

      <Separator className="my-6" />

      <Suspense fallback={<div>Cargando usuarios...</div>}>
        <UserDashboard />
      </Suspense>
    </div>
  )
}
