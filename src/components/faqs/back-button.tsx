"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export function BackButton() {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="mb-6 text-muted-foreground hover:text-foreground transition-colors"
      asChild
    >
      <Link href="/">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Volver al inicio
      </Link>
    </Button>
  )
}

