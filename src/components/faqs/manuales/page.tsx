import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Download, FileText, FileSpreadsheet, Users, Settings, Server, HelpCircle, BookOpen, FileCog, FileDigit } from "lucide-react"
import { useState, ReactNode } from "react"

// Definición del tipo para los manuales
interface Manual {
  id: number;
  title: string;
  description: string;
  fileName: string;
  icon: ReactNode;
}

export const ManualesSeccion = () => {
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  
  // Función para forzar descarga directa sin abrir en el navegador
  const handleDownload = (manual: Manual) => {
    try {
      setDownloadingId(manual.id);
      
      // Método directo para la descarga (más sencillo y menos propenso a errores)
      // Crear un enlace directo al archivo
      const baseUrl = window.location.origin;
      const pdfUrl = `${baseUrl}/manuales/${encodeURIComponent(manual.fileName)}`;
      
      // Crear elemento de descarga
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = pdfUrl;
      a.setAttribute('download', manual.fileName); // Forzar descarga en vez de abrir
      a.setAttribute('target', '_blank'); // Asegurar que se abra en una nueva pestaña si el navegador no descarga
      document.body.appendChild(a);
      
      // Forzar descarga
      a.click();
      
      // Limpiar el elemento
      setTimeout(() => {
        document.body.removeChild(a);
        setDownloadingId(null);
      }, 100);
    } catch (error) {
      console.error("Error al descargar:", error);
      // Corregir el tipado del error para TypeScript
      let errorMessage = "Error desconocido";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      alert(`No se pudo descargar el archivo: ${errorMessage}`);
      setDownloadingId(null);
    }
  };


  const manuales: Manual[] = [
    {
        id: 1,
        title: "Manual de Inicio",
        description: "Primeros pasos para comenzar a utilizar el sistema.",
        fileName: "Manual-inicio.pdf",
        icon: <BookOpen className="w-10 h-10 text-blue-600" />
      },
    {
      id: 2,
      title: "Manual de Configuración",
      description: "Aprende a configurar correctamente todas las opciones del sistema.",
      fileName: "Manual-configuracion.pdf",
      icon: <FileCog className="w-10 h-10 text-blue-600" />
    },
    {
      id: 3,
      title: "Manual de Documentos digitales",
      description: "Gestión y manejo de documentos digitales en el sistema.",
      fileName: "Manual-documentos-digitales.pdf",
      icon: <FileDigit className="w-10 h-10 text-blue-600" />
    },
    {
      id: 4,
      title: "Manual de Gestión de Solicitudes",
      description: "Proceso completo para gestionar solicitudes en el sistema.",
      fileName: "Manual-gestion-solicitudes.pdf",
      icon: <FileText className="w-10 h-10 text-blue-600" />
    },
    {
      id: 5,
      title: "Manual de Mis Documentos",
      description: "Cómo administrar tus documentos personales en el sistema.",
      fileName: "Manual-mis-documentos.pdf",
      icon: <FileText className="w-10 h-10 text-blue-600" />
    },
    {
      id: 6,
      title: "Manual de Mis solicitudes",
      description: "Todo sobre la gestión de solicitudes propias en el sistema.",
      fileName: "Manual-mis-solicitudes.pdf",
      icon: <FileText className="w-10 h-10 text-blue-600" />
    },
    {
      id: 7,
      title: "Manual de Registro",
      description: "Guía paso a paso para el proceso de registro en el sistema.",
      fileName: "Manual-registro.pdf",
      icon: <Users className="w-10 h-10 text-blue-600" />
    },
    {
      id: 8,
      title: "Manual de Tipos de Solicitudes",
      description: "Información detallada sobre los distintos tipos de solicitudes.",
      fileName: "Manual-tipos-solicitudes.pdf",
      icon: <FileSpreadsheet className="w-10 h-10 text-blue-600" />
    },
    {
        id: 9,
        title: "Manual de Administración de catálogos",
        description: "Guía completa para la administración de catálogos del sistema.",
        fileName: "Manual-admin-catalogos.pdf",
        icon: <Settings className="w-10 h-10 text-blue-600" />
      },
    {
      id: 10,
      title: "Manual de la Sección de Ayuda",
      description: "Guía completa sobre el uso de la sección de ayuda.",
      fileName: "Manual-seccion-ayuda.pdf",
      icon: <HelpCircle className="w-10 h-10 text-blue-600" />
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-16 mb-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 font-roboto">Manuales del Sistema</h2>
        <p className="text-muted-foreground">
          Descarga nuestros manuales para aprender a utilizar todas las funciones del sistema
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {manuales.map((manual, index) => (
          <motion.div
            key={manual.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 flex items-center justify-center">
                {manual.icon}
              </div>
            </div>
            <h3 className="text-xl font-medium text-center mb-3">{manual.title}</h3>
            <p className="text-gray-500 text-center text-sm flex-grow mb-4">
              {manual.description}
            </p>
            <div className="mt-auto">
              <Button 
                className="w-full bg-white hover:bg-gray-50 text-blue-600 border border-gray-200" 
                variant="outline"
                onClick={() => handleDownload(manual)}
                disabled={downloadingId === manual.id}
              >
                <Download className="mr-2 h-4 w-4" />
                {downloadingId === manual.id ? 'Descargando...' : 'Descargar PDF'}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default ManualesSeccion;