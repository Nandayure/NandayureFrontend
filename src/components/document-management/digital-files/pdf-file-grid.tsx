'use client'

import { useState, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, FileIcon, Eye } from "lucide-react"
import useGetToken from '@/hooks/common/useGetToken'

// Configuración necesaria para react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface File {
  thumbnailLink: string
  iconLink: string
  webViewLink: string
  id: string
  name: string
}

const PdfFileGrid = () => {
  const { token } = useGetToken();
  const [files, setFiles] = useState<File[]>([])
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchFiles()
  }, [])

  const fetchFiles = async () => {
    try {
      if (!token) throw new Error('No se ha podido obtener el token de autenticación')
      const response = await fetch('https://nandayurebackend-production.up.railway.app/api/v1/google-drive-files/MyFiles', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Error al cargar los archivos')
      const data = await response.json()
      setFiles(data)
    } catch (err) {
      setError('Error al cargar los archivos. Por favor, intente de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (fileId: string) => {
    setSelectedFile(`https://nandayurebackend-production.up.railway.app/api/v1/google-drive-files/getFile/${fileId}`)
  }

  if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" /></div>
  if (error) return <div className="text-red-500 text-center">{error}</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Archivos del Empleado</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Lista de Archivos</h2>
            <ul className="space-y-2">
              {files.map((file) => (
                <li key={file.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img src={file.thumbnailLink} alt="" className="w-8 h-8 mr-2" />
                    <span>{file.name}</span>
                  </div>
                  <Button onClick={() => handleFileSelect(file.id)} variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Previsualización</h2>
            {selectedFile ? (
              <Document
                file={selectedFile}
                loading={<Loader2 className="animate-spin" />}
                error={<div>Error al cargar el PDF. Intente de nuevo.</div>}
              >
                <Page pageNumber={1} width={300} />
              </Document>
            ) : (
              <div className="text-center text-gray-500">
                <FileIcon className="mx-auto mb-2" />
                Seleccione un archivo para previsualizar
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PdfFileGrid;