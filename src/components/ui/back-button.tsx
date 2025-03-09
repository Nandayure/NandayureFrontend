"use client"

import { ChevronLeft } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface BackButtonProps {
  href: string
  label?: string
  className?: string
}

export function BackButton({
  href,
  label = "Volver",
  className = "",
}: BackButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      asChild
      className={`group flex items-center gap-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-800 ${className}`}
    >
      <Link href={href}>
        <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        <span className="text-sm font-medium">{label}</span>
      </Link>
    </Button>
  )
}
