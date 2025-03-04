"use client"

import { Button } from "@/components/ui/button"
import { FaqCategory } from "@/types/faq-categories/faq-categories"
import { motion } from "framer-motion"

interface FAQCategoriesProps {
  categories: FaqCategory[]
  selectedCategoryId: number | "all"
  onCategoryChange: (categoryId: number | "all") => void
}

export function FAQCategories({ categories, selectedCategoryId, onCategoryChange }: FAQCategoriesProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      <Button
        variant={selectedCategoryId === "all" ? "default" : "outline"}
        onClick={() => onCategoryChange("all")}
        className="rounded-full"
      >
        Todos
      </Button>
      {categories.map((category) => (
        <motion.div key={category.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant={selectedCategoryId === category.id ? "default" : "outline"}
            onClick={() => onCategoryChange(category.id)}
            className="rounded-full"
          >
            {category.name}
          </Button>
        </motion.div>
      ))}
    </div>
  )
}

