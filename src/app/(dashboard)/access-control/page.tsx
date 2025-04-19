'use client'

import { SectionHeader } from "@/components/ui/section-header";
import { Separator } from "@/components/ui/separator";
import { UserDashboard } from "@/components/user/user-dashboard";

export default async function Page() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6">
      <SectionHeader
        title="Administración de Usuarios"
        description="Aquí puedes gestionar los usuarios de tu aplicación. Puedes deshabilitar o habilitar según sea necesario."
      >
      </SectionHeader>

      <Separator className="my-6" />

      <UserDashboard />

    </div>
  )
}
