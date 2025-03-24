"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion, AnimatePresence } from "framer-motion"
import { Clock } from "lucide-react"
import React from "react"
import { Faq } from "@/types/faq/faq"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface FAQAccordionProps {
  items: Faq[]
}

function FormattedAnswer({ answer }: { answer: string }) {
  const lines = answer.split("\n")
  return (
    <>
      {lines.map((line, index) => {
        const words = line.split(" ")
        return (
          <p key={index} className="py-1">
            {words.map((word, i) => {
              if (/^https?:\/\/[^\s]+$/.test(word)) {
                return (
                  <a
                    key={i}
                    href={word}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {word}{" "}
                  </a>
                )
              } else if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(word)) {
                return (
                  <a key={i} href={`mailto:${word}`} className="text-blue-500 underline">
                    {word}{" "}
                  </a>
                )
              }
              return word + " "
            })}
          </p>
        )
      })}
    </>
  )
}

// Componente para formatear la fecha reemplaza el anterior FormattedDate
function FormattedDateDisplay({ dateString }: { dateString?: string | null }) {
  if (!dateString) return <span>Fecha no disponible</span>;

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return <span>Fecha inválida</span>;

    return (
      <span>{format(date, 'd MMMM yyyy', { locale: es })}</span>
    );
  } catch (error) {
    console.error('Error al formatear fecha:', error);
    return <span>Error en formato de fecha</span>;
  }
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-3xl mx-auto"
      >
        <Accordion type="single" collapsible className="w-full">
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id.toString()}>
              <AccordionTrigger className="text-left cursor-pointer">{item.question}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <FormattedAnswer answer={item.answer} />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <FormattedDateDisplay dateString={item.updated_at || item.created_at} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </AnimatePresence>
  )
}

