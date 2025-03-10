'use client'
import { Suspense } from "react"
import PdfFileGrid from "@/components/document-management/my-files/PdfFileGrid"
import { BackButton } from "@/components/ui/back-button"
import { useUserFiles } from "@/hooks";
import { useParams, useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/ui/section-title";

export default function Page() {
  const params = useParams<{ slug: string }>()
  const searchParams = useSearchParams();

  const folderName = searchParams.get('folderName')
    ? decodeURIComponent(searchParams.get('folderName')!)
    : 'Archivos';
  const { files, isLoading, isError, error } = useUserFiles(params.slug);

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="mb-4 flex items-center gap-2">
          <BackButton href="/my-file" label="Volver a mis carpetas" />
        </div>
        <PageHeader
          title={`Documentos - ${folderName}`}  
          description="Acceso a los documentos del empleado."
        />
      </div>
      <Suspense fallback={<div>Cargando archivos...</div>}>
        <PdfFileGrid files={files} isLoading={isLoading} isError={isError} error={error} hideDeleteButton />
      </Suspense>
    </>
  )
}
