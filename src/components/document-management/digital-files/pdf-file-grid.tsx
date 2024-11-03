'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileIcon, FolderIcon, ExternalLinkIcon, SearchIcon } from "lucide-react"

type FileObject = {
  thumbnailLink?: string
  iconLink: string
  webViewLink: string
  id: string
  name: string
}

const mockFiles: FileObject[] = [
  {
    "thumbnailLink": "https://lh3.googleusercontent.com/drive-storage/AJQWtBMLsEahqSRm0kLY4iXh25gKGmhytqz7KMiyFMmHELidU6qK9ardqrs4BhZxra9cc4UYf7au07Z7IrTT0P4pRX4Xq7IieStHVgPLOZUeSyT8A3w=s220",
    "iconLink": "https://drive-thirdparty.googleusercontent.com/16/type/application/pdf",
    "webViewLink": "https://drive.google.com/file/d/1bZJxE3hs6SRBOGju6JqptfcaPM7ur38N/view?usp=drivesdk",
    "id": "1bZJxE3hs6SRBOGju6JqptfcaPM7ur38N",
    "name": "TRABAJO ASINCRÓNICO-Liderazgo.pdf-2024-11-02.pdf"
  },
  {
    "iconLink": "https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.folder+shared",
    "webViewLink": "https://drive.google.com/drive/folders/1qlIh5hlwfOQON4JjJyQ7pZVGS7Za2GZC",
    "id": "1qlIh5hlwfOQON4JjJyQ7pZVGS7Za2GZC",
    "name": "117490804 - Jimena Jimenez"
  },
  {
    "iconLink": "https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.folder+shared",
    "webViewLink": "https://drive.google.com/drive/folders/1VjEVh1I5T-R1VCKQUCwZE9hP8nKbnwQu",
    "id": "1VjEVh1I5T-R1VCKQUCwZE9hP8nKbnwQu",
    "name": "12098347 - adsa dassdad"
  },
  {
    "iconLink": "https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.folder+shared",
    "webViewLink": "https://drive.google.com/drive/folders/1tA3ol_ReZBhiT0KScga8c0hoHvfx7FGy",
    "id": "1tA3ol_ReZBhiT0KScga8c0hoHvfx7FGy",
    "name": "710 - string string"
  },
  {
    "iconLink": "https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.folder+shared",
    "webViewLink": "https://drive.google.com/drive/folders/1xvxxAJxmK1KswfEsmRTTgh4hTKxib8ei",
    "id": "1xvxxAJxmK1KswfEsmRTTgh4hTKxib8ei",
    "name": "prueba2 - sdad stasdasring"
  },
  {
    "iconLink": "https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.folder+shared",
    "webViewLink": "https://drive.google.com/drive/folders/1Vj5JQjY5J5KgiJRGPzmOJ_Ov7uzO70uW",
    "id": "1Vj5JQjY5J5KgiJRGPzmOJ_Ov7uzO70uW",
    "name": "prueba - sdad stasdasring"
  },
  {
    "iconLink": "https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.folder+shared",
    "webViewLink": "https://drive.google.com/drive/folders/1e2Eco4__k1Xgho_f7ne8Td5PRkIXqsc2",
    "id": "1e2Eco4__k1Xgho_f7ne8Td5PRkIXqsc2",
    "name": "11388qq - sdad stasdasring"
  },
  {
    "iconLink": "https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.folder+shared",
    "webViewLink": "https://drive.google.com/drive/folders/1VYTetfuupZapOLhYJDCQR8HfGen6swUV",
    "id": "1VYTetfuupZapOLhYJDCQR8HfGen6swUV",
    "name": "1131721 - sdad stasdasring"
  },
  {
    "iconLink": "https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.folder+shared",
    "webViewLink": "https://drive.google.com/drive/folders/1QNDaMnkSNL0V6RcAfyDLUMzhOvN6_gSF",
    "id": "1QNDaMnkSNL0V6RcAfyDLUMzhOvN6_gSF",
    "name": "78910 - string string"
  },
  {
    "iconLink": "https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.folder+shared",
    "webViewLink": "https://drive.google.com/drive/folders/1o9Gn-5YJif0iHMq7dbZz8lrt1rvJruSz",
    "id": "1o9Gn-5YJif0iHMq7dbZz8lrt1rvJruSz",
    "name": "12345678910 - string string"
  }
]

export default function PdfGrid() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredFiles = mockFiles.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Explorador de Archivos</h1>
      <div className="mb-4 relative">
        <Input
          type="text"
          placeholder="Buscar archivos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFiles.map((file) => (
          <Card key={file.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium truncate">{file.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-2">
                {file.iconLink.includes("folder") ? (
                  <FolderIcon className="h-6 w-6 text-yellow-500" />
                ) : (
                  <FileIcon className="h-6 w-6 text-blue-500" />
                )}
                <span className="text-sm text-gray-500">
                  {file.iconLink.includes("folder") ? "Carpeta" : "Archivo PDF"}
                </span>
              </div>
              {file.thumbnailLink && (
                <img
                  src={file.thumbnailLink}
                  alt={`Miniatura de ${file.name}`}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
              )}
              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={() => window.open(file.webViewLink, "_blank")}
              >
                <ExternalLinkIcon className="mr-2 h-4 w-4" />
                Ver {file.iconLink.includes("folder") ? "Carpeta" : "Archivo"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}