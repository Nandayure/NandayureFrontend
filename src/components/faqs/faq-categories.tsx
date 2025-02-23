"use client"

import { Button } from "@/components/ui/button"
import { categories } from "@/mocks/faqs"
import { FAQCategory } from "@/types/faqs/faq.types"
import { motion } from "framer-motion"

interface FAQCategoriesProps {
  selectedCategory: FAQCategory | "all"
  onCategoryChange: (category: FAQCategory | "all") => void
}

export function FAQCategories({ selectedCategory, onCategoryChange }: FAQCategoriesProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      <Button
        variant={selectedCategory === "all" ? "default" : "outline"}
        onClick={() => onCategoryChange("all")}
        className="rounded-full"
      >
        Todos
      </Button>
      {(Object.entries(categories) as [FAQCategory, string][]).map(([key, label]) => (
        <motion.div key={key} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant={selectedCategory === key ? "default" : "outline"}
            onClick={() => onCategoryChange(key as FAQCategory)}
            className="rounded-full"
          >
            {label}
          </Button>
        </motion.div>
      ))}
    </div>
  )
}

