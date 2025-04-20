import { SectionHeader } from "@/components/ui/section-header";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6">
      <SectionHeader
        title="Administración de Roles"
        description="Aquí puedes gestionar los roles de tu aplicación. Puedes deshabilitar o habilitar según sea necesario."
      >
      </SectionHeader>

      <Separator className="my-6" />

      <Suspense fallback={<div>Cargando roles...</div>}>
        Roles
      </Suspense>
    </div>
  );
}