"use client"

import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import {
  Download,
  FileText,
  FileSpreadsheet,
  Users,
  Settings,
  HelpCircle,
  BookOpen,
  FileCog,
  FileDigit,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { Roles } from "@/constants/roles/roles"
import { useGetRoles } from "@/hooks"

// Type definitions
type IconComponent = typeof FileText
interface Manual {
  id: number
  title: string
  description: string
  fileName: string
  allowedRoles?: Roles[]
  icon: IconComponent
}

export default function ManualsGrid() {
  const [downloadingId, setDownloadingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const { roles, status } = useGetRoles()

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Optimized download function
  const handleDownload = async (manual: Manual) => {
    try {
      setDownloadingId(manual.id)

      const baseUrl = window.location.origin
      const pdfUrl = `${baseUrl}/manuales/${encodeURIComponent(manual.fileName)}`

      // Using fetch to check if the file exists before downloading
      const response = await fetch(pdfUrl, { method: "HEAD" })

      if (!response.ok) {
        throw new Error(`Archivo no encontrado (${response.status})`)
      }

      // Create download element
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = pdfUrl
      a.setAttribute("download", manual.fileName)
      document.body.appendChild(a)

      // Trigger download
      a.click()

      // Clean up and show success toast
      document.body.removeChild(a)
      toast.success(`${manual.title} descargado correctamente`)
    } catch (error) {
      // Error handling with toast notification
      console.error("Error al descargar:", error)
      const errorMessage = error instanceof Error ? error.message : "Error desconocido"
      toast.error(`No se pudo descargar el archivo: ${errorMessage}`)
    } finally {
      setDownloadingId(null)
    }
  }

  // Manuals data with typed icons
  const manuals: Manual[] = [
    {
      id: 1,
      title: "Manual de Inicio",
      description: "Primeros pasos para comenzar a utilizar el sistema.",
      fileName: "Manual-inicio.pdf",
      icon: BookOpen,
      allowedRoles: [Roles.user, Roles.ti, Roles.rh, Roles.va, Roles.departmentHead],
    },
    {
      id: 2,
      title: "Manual de Configuración",
      description: "Aprende a configurar correctamente todas las opciones del sistema.",
      fileName: "Manual-configuracion.pdf",
      icon: FileCog,
      allowedRoles: [Roles.ti, Roles.rh],
    },
    {
      id: 3,
      title: "Manual de Documentos digitales",
      description: "Gestión y manejo de documentos digitales en el sistema.",
      fileName: "Manual-documentos-digitales.pdf",
      icon: FileDigit,
      allowedRoles: [Roles.ti, Roles.rh],
    },
    {
      id: 4,
      title: "Manual de Gestión de Solicitudes",
      description: "Proceso completo para gestionar solicitudes en el sistema.",
      fileName: "Manual-gestion-solicitudes.pdf",
      icon: FileText,
      allowedRoles: [Roles.rh],
    },
    {
      id: 5,
      title: "Manual de Mis Documentos",
      description: "Cómo administrar tus documentos personales en el sistema.",
      fileName: "Manual-mis-documentos.pdf",
      icon: FileText,
      allowedRoles: [Roles.user, Roles.ti, Roles.rh, Roles.va, Roles.departmentHead],
    },
    {
      id: 6,
      title: "Manual de Mis solicitudes",
      description: "Todo sobre la gestión de solicitudes propias en el sistema.",
      fileName: "Manual-mis-solicitudes.pdf",
      icon: FileText,
      allowedRoles: [Roles.user, Roles.ti, Roles.rh, Roles.va, Roles.departmentHead],
    },
    {
      id: 7,
      title: "Manual de Registro",
      description: "Guía paso a paso para el proceso de registro en el sistema.",
      fileName: "Manual-registro.pdf",
      icon: Users,
      allowedRoles: [Roles.ti, Roles.rh],
    },
    {
      id: 8,
      title: "Manual de Tipos de Solicitudes",
      description: "Información detallada sobre los distintos tipos de solicitudes.",
      fileName: "Manual-tipos-solicitudes.pdf",
      icon: FileSpreadsheet,
      allowedRoles: [Roles.ti, Roles.rh],
    },
    {
      id: 9,
      title: "Manual de Administración de catálogos",
      description: "Guía completa para la administración de catálogos del sistema.",
      fileName: "Manual-admin-catalogos.pdf",
      icon: Settings,
      allowedRoles: [Roles.rh],
    },
    {
      id: 10,
      title: "Manual de la Sección de Ayuda",
      description: "Guía completa sobre el uso de la sección de ayuda.",
      fileName: "Manual-seccion-ayuda.pdf",
      icon: HelpCircle,
      allowedRoles: [Roles.user, Roles.ti, Roles.rh, Roles.va, Roles.departmentHead],
    },
  ]

  // Skeleton loader component
  const ManualSkeleton = () => (
    <div className="bg-white rounded-lg p-6 border border-dodger-blue-100 shadow-sm flex flex-col h-full">
      <div className="flex justify-center mb-6">
        <Skeleton className="w-16 h-16 rounded-full" />
      </div>
      <Skeleton className="h-6 w-3/4 mx-auto mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mx-auto mb-4" />
      <div className="mt-auto">
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )

  return (
    <div className="w-full py-8">
      <div className="text-center mb-8">
        {loading ? (
          <>
            <Skeleton className="h-10 w-1/3 mx-auto mb-4" />
            <Skeleton className="h-5 w-2/3 mx-auto" />
          </>
        ) : (
          <>
            <h2 className="text-4xl font-bold mb-4 font-roboto">Manuales del Sistema</h2>
            <p className="text-muted-foreground">
              Descarga nuestros manuales para aprender a utilizar todas las funciones del sistema
            </p>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array(9)
            .fill(0)
            .map((_, index) => <ManualSkeleton key={index} />)
          : manuals
            .filter((manual) =>
              !manual.allowedRoles || manual.allowedRoles.some((role) => roles?.includes(role))
            )
            .map((manual) => (
              <div
                key={manual.id}
                className="bg-white rounded-lg p-6 border border-dodger-blue-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-dodger-blue-50">
                    <manual.icon className="w-8 h-8 text-dodger-blue-600" />
                  </div>
                </div>

                <h3 className="text-xl font-medium text-center mb-3">{manual.title}</h3>

                <p className="text-gray-500 text-center text-sm grow mb-4">{manual.description}</p>

                <div className="mt-auto">
                  <Button
                    className={cn(
                      "w-full bg-white hover:bg-dodger-blue-50 text-dodger-blue-600 border border-dodger-blue-200 cursor-pointer",
                      downloadingId === manual.id && "opacity-80",
                    )}
                    variant="outline"
                    onClick={() => handleDownload(manual)}
                    disabled={downloadingId === manual.id}
                  >
                    {downloadingId === manual.id ? (
                      <>
                        <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-dodger-blue-600 border-t-transparent" />
                        Descargando...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Descargar PDF
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}

