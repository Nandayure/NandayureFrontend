'use client'

import * as React from "react"
import { Search, X } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Función que se ejecuta cuando cambia el valor de búsqueda
   */
  onSearch: (value: string) => void
  /**
   * Tiempo de espera antes de ejecutar la búsqueda (en ms)
   * @default 300
   */
  debounceTime?: number
  /**
   * Placeholder del campo de búsqueda
   * @default "Buscar..."
   */
  placeholder?: string
  /**
   * Clase CSS adicional
   */
  className?: string
  /**
   * Clase CSS adicional para el contenedor
   */
  containerClassName?: string
  /**
   * Mostrar botón para limpiar la búsqueda
   * @default true
   */
  showClearButton?: boolean
}

export function SearchBar({
  onSearch,
  debounceTime = 300,
  placeholder = "Buscar...",
  className,
  containerClassName,
  showClearButton = true,
  ...props
}: SearchBarProps) {
  const [value, setValue] = React.useState<string>(props.defaultValue?.toString() || "")
  const debounceTimeout = React.useRef<NodeJS.Timeout | null>(null)

  // Manejar cambios en el input con debounce
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setValue(newValue)

      // Limpiar timeout anterior si existe
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }

      // Crear nuevo timeout
      debounceTimeout.current = setTimeout(() => {
        onSearch(newValue)
      }, debounceTime)
    },
    [onSearch, debounceTime]
  )

  // Limpiar el timeout al desmontar el componente
  React.useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }
    }
  }, [])

  // Función para limpiar la búsqueda
  const handleClear = () => {
    setValue("")
    onSearch("")
  }

  return (
    <div className={cn("relative", containerClassName)}>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className={cn("pl-8 pr-10", className)}
        value={value}
        onChange={handleChange}
        {...props}
      />
      {showClearButton && value && (
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
}
