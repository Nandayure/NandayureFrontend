'use client'

import { Suspense } from "react"
import PdfFileGrid from "@/components/document-management/my-files/PdfFileGrid"
import { BackButton } from "@/components/ui/back-button"
import { useEmployeeFiles } from "@/hooks/files/useEmployeeFiles";
import { useParams } from "next/navigation";
import PDFUploader from "@/components/common/pdf-uploader";
import { Button } from "@/components/ui/button";

export default function Page() {
  const params = useParams<{ slug: string; folderId: string }>()
  const { files, isLoading, isError, error } = useEmployeeFiles(params.folderId);

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="mb-4 flex items-center gap-2">
          <BackButton href={`/document-management/digital-files/${params.slug}`} label="Volver a mis carpetas" />
        </div>
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">Mis archivos</h1>
        <PDFUploader folderId={params.folderId}>
          <Button>Subir archivo</Button>
        </PDFUploader>
      </div>
      <Suspense fallback={<div>Cargando archivos...</div>}>
        <PdfFileGrid files={files} isLoading={isLoading} isError={isError} error={error} />
      </Suspense>
    </>
  )
}
