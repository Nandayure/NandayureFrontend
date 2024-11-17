import Link from 'next/link'
import { ClipboardList } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function NoRequest() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <ClipboardList className="w-12 h-12 mx-auto text-gray-400" />
          <CardTitle className="mt-4 text-2xl font-bold">No existen solicitudes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">
            Actualmente no hay solicitudes disponibles. Por favor, crea una nueva solicitud para comenzar.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}