"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FAQSearch } from "@/components/faqs/faq-search"
import { FAQCategories } from "@/components/faqs/faq-categories"
import { FAQAccordion } from "@/components/faqs/faq-accordion"
import { BackButton } from "@/components/faqs/back-button"
import { Button } from "@/components/ui/button"
import { useGetRoles } from "@/hooks"
import useGetFaqs from "@/hooks/faq/queries/useGetFaqs"
import useGetFaqCategories from "@/hooks/faq-categories/queries/useGetFaqCategories"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, RefreshCw } from "lucide-react"
import ManualsGrid from "@/components/faqs/manuals/manuals-grid"


export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | "all">("all")
  const { roles } = useGetRoles()

  // Obtener datos reales con hooks
  const { faqs = [], isLoading: isLoadingFaqs, isError: isErrorFaqs, error: faqsError, refetch: refetchFaqs } = useGetFaqs();
  const { faqCategories = [], isLoading: isLoadingCategories, isError: isErrorCategories, refetch: refetchCategories } = useGetFaqCategories();

  // Filtrar FAQs basado en búsqueda y categoría seleccionada
  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategoryId === "all" || faq.faqCategoryId === selectedCategoryId
    const isActive = faq.status === 'active'
    return matchesSearch && matchesCategory && isActive
  })

  // Estados de carga
  const isLoading = isLoadingFaqs || isLoadingCategories;

  // Errores
  const hasError = isErrorFaqs || isErrorCategories;
  const error = faqsError || (isErrorCategories ? new Error("Error al cargar categorías") : null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Skeleton className="h-6 w-24 mb-8" /> {/* Back button */}
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-4" /> {/* Title */}
            <Skeleton className="h-4 w-96 mx-auto" /> {/* Subtitle */}
          </div>
          <Skeleton className="h-10 w-full mb-8" /> {/* Search */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-24" /> /* Categories */
            ))}
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="mb-4">
              <Skeleton className="h-12 w-full mb-2" /> {/* Question */}
              <Skeleton className="h-24 w-full" /> {/* Answer */}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <BackButton path="/" />
          <Alert variant="destructive" className="my-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error al cargar preguntas frecuentes</AlertTitle>
            <AlertDescription>
              <div className="flex flex-col space-y-2">
                <p>{error instanceof Error ? error.message : 'Ha ocurrido un error al cargar el contenido'}</p>
                <div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      refetchFaqs();
                      refetchCategories();
                    }}
                    className="mt-2"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reintentar
                  </Button>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto max-w-4xl"
      >
        <BackButton path="/" />
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 font-roboto">Preguntas Frecuentes</h1>
          <p className="text-muted-foreground">
            Encuentre respuestas a las preguntas más comunes sobre nuestros servicios
          </p>
          {roles && roles.includes('RH') && (
            <Button
              className="mt-4"
            >
              <Link href="/helps/faqs-management">
                Gestión de Preguntas Frecuentes
              </Link>
            </Button>
          )}
        </div>

        <FAQSearch onSearch={setSearchTerm} />
        <FAQCategories
          categories={faqCategories}
          selectedCategoryId={selectedCategoryId}
          onCategoryChange={setSelectedCategoryId}
        />

        {filteredFaqs.length > 0 ? (
          <FAQAccordion items={filteredFaqs} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground py-8"
          >
            No se encontraron resultados para su búsqueda.
          </motion.div>
        )}
        <ManualsGrid />
      </motion.div>
    </div>
  )
}