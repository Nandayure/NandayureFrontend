"use client"

import { FAQItem } from "@/app/helps/page"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion, AnimatePresence } from "framer-motion"
import { Clock } from "lucide-react"
import { FormattedDate } from "./formatted-date"
import React from "react"

interface FAQAccordionProps {
  items: FAQItem[]
}

function FormattedAnswer({ answer }: { answer: string }) {
  const lines = answer.split("\n")
  return (
    <>
      {lines.map((line, index) => {

        const words = line.split(" ")
        return (
          <p key={index}>
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
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <FormattedAnswer answer={item.answer} />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <FormattedDate date={item.updated_at} />
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

