'use client'

import * as React from "react"
import { Search, X } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch: (value: string) => void
  value?: string
  debounceTime?: number
  placeholder?: string
  className?: string
  containerClassName?: string
  showClearButton?: boolean
  InputDataCy?: string
}

export const SearchBar = React.memo(function SearchBar({
  onSearch,
  value = "",
  debounceTime = 300,
  placeholder = "Buscar...",
  className,
  containerClassName,
  showClearButton = true,
  InputDataCy,
  ...props
}: SearchBarProps) {
  const [localValue, setLocalValue] = React.useState(value)
  const debounceTimeout = React.useRef<NodeJS.Timeout | null>(null)

  // Sincronizar el valor local con el prop value cuando cambia externamente
  React.useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setLocalValue(newValue)

      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }

      debounceTimeout.current = setTimeout(() => {
        onSearch(newValue)
      }, debounceTime)
    },
    [onSearch, debounceTime]
  )

  React.useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }
    }
  }, [])

  const handleClear = React.useCallback(() => {
    setLocalValue("")
    onSearch("")
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }
  }, [onSearch])

  return (
    <div className={cn("relative", containerClassName)}>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        className={cn("pl-8 pr-10", className)}
        value={localValue}
        onChange={handleChange}
        data-cy={InputDataCy}
        {...props}
      />
      {showClearButton && localValue && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-0 hover:bg-transparent"
          onClick={handleClear}
          aria-label="Limpiar búsqueda"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </Button>
      )}
    </div>
  )
})
