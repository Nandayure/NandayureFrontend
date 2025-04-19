'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InactiveUserTab } from "@/components/user/inactive-user-tab";
import { ActiveUserTab } from "@/components/user/active-user-tab";

export default function UserManagementPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
          <p className="text-gray-500 mt-2">
            Administre los usuarios del sistema y sus estados
          </p>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">Usuarios Activos</TabsTrigger>
            <TabsTrigger value="inactive">Usuarios Inactivos</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <ActiveUserTab />
          </TabsContent>

          <TabsContent value="inactive">
            <InactiveUserTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}