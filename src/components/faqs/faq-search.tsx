"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface FAQSearchProps {
  onSearch: (term: string) => void
}

export function FAQSearch({ onSearch }: FAQSearchProps) {
  return (
    <div className="relative max-w-xl mx-auto mb-8">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Buscar preguntas frecuentes..."
        className="pl-10"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )
}

