"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FAQSearch } from "@/components/faqs/faq-search"
import { FAQCategories } from "@/components/faqs/faq-categories"
import { FAQAccordion } from "@/components/faqs/faq-accordion"
import { BackButton } from "@/components/faqs/back-button"
import { FAQCategory, faqs } from "@/mocks/faqs"

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory | "all">("all")

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto max-w-4xl"
      >
        <BackButton />
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 font-roboto">Preguntas Frecuentes</h1>
          <p className="text-muted-foreground">
            Encuentre respuestas a las preguntas más comunes sobre nuestros servicios
          </p>
        </div>

        <FAQSearch onSearch={setSearchTerm} />
        <FAQCategories selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

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
      </motion.div>
    </div>
  )
}

