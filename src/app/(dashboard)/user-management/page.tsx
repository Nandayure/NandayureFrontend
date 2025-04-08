import { Separator } from "@/components/ui/separator";
import { UserDashboard } from "@/components/user-management/user-dashboard";

export default function UserManagement() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Administración de Usuarios
          </h1>
          <p className="text-muted-foreground text-sm max-w-2xl">
            Aquí puedes gestionar los usuarios de tu aplicación. Puedes
            desabilitar, habilitar o eliminar usuarios según sea necesario.
          </p>
        </div>

      </div>

      <Separator className="my-6" />

      <UserDashboard />
    </div>
  );
}