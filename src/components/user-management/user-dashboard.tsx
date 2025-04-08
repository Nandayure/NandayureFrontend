"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, UserX } from "lucide-react"
import ActiveUserTab from "./active-user-tab"
import DeleteUserTab from "./delete-user-tab"

export function UserDashboard() {

  return (
    <>
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-8 grid w-full max-w-md grid-cols-2 bg-gray-100">
          <TabsTrigger value="active" className="flex items-center gap-2 data-[state=active]:bg-white">
            <Users className="h-4 w-4" />
            <span>Usuarios Activos</span>

          </TabsTrigger>
          <TabsTrigger value="deleted" className="flex items-center gap-2 data-[state=active]:bg-white">
            <UserX className="h-4 w-4" />
            <span>Usuarios Eliminados</span>

          </TabsTrigger>
        </TabsList>

        <div>
          <TabsContent value="active">
            <ActiveUserTab />
          </TabsContent>
          <TabsContent value="deleted">
            <DeleteUserTab />
          </TabsContent>
        </div>
      </Tabs>
    </>
  )
}
