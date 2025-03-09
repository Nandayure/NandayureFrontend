import { Suspense } from "react"
import PdfFileGrid from "@/components/document-management/my-files/PdfFileGrid"
import { BackButton } from "@/components/faqs/back-button"

export default async function Page({
  params,
}: {
  params: { slug: string }
}) {

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold text-gray-800">Mis archivos</h1>
        <BackButton path="/my-file" buttonText="Volver" />
      </div>
      <Suspense fallback={<div>Cargando archivos...</div>}>
        <PdfFileGrid id={params.slug} />
      </Suspense>
    </>
  )
}

