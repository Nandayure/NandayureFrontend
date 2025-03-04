"use client"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

interface BackButtonProps {
  path: string
  buttonText?: string 
}

export function BackButton({ path, buttonText = "Volver al inicio" }: BackButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="mb-6 text-muted-foreground hover:text-foreground transition-colors"
      asChild
    >
      <Link href={path}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        {buttonText}
      </Link>
    </Button>
  )
}