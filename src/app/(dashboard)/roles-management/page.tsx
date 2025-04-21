import { SectionHeader } from "@/components/ui/section-header";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RolesList } from "@/components/roles/roles-list";
import { UserRoleManagement } from "@/components/roles/user-role-management";

export default function Page() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6">
      <SectionHeader
        title="Administración de Roles"
        description="Aquí puedes gestionar los roles de tu aplicación y asignarlos a los usuarios."
      />

      <Separator className="my-6" />

      <Tabs defaultValue="roles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="roles">Roles del Sistema</TabsTrigger>
          <TabsTrigger value="users">Roles de Usuarios</TabsTrigger>
        </TabsList>
        <TabsContent value="roles">
          <RolesList />
        </TabsContent>
        <TabsContent value="users">
          <UserRoleManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}