'use client'

import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InactiveUserTab } from "@/components/user/inactive-user-tab";
import { ActiveUserTab } from "@/components/user/active-user-tab";
import { Skeleton } from "@/components/ui/skeleton";

const TabContentSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-10 w-36" />
        <Skeleton className="h-10 w-48" />
      </div>
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-20 w-full" />
        ))}
      </div>
    </div>
  );
};

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
            <Suspense fallback={<TabContentSkeleton />}>
              <ActiveUserTab />
            </Suspense>
          </TabsContent>

          <TabsContent value="inactive">
            <Suspense fallback={<TabContentSkeleton />}>
              <InactiveUserTab />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}