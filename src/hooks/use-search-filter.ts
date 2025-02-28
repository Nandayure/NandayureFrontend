'use client';

import { useState, useCallback, useMemo } from 'react';

interface UseSearchFilterOptions<T> {
  /**
   * Datos originales a filtrar
   */
  data: T[] | undefined;
  /**
   * Campos por los que se realizará la búsqueda
   */
  searchFields: (keyof T)[];
  /**
   * Valor inicial de búsqueda
   * @default ""
   */
  initialSearchValue?: string;
  /**
   * Función personalizada para determinar si un elemento coincide con la búsqueda
   * Si se proporciona, se usará en lugar de la lógica predeterminada
   */
  customMatchFunction?: (item: T, searchValue: string) => boolean;
}

interface UseSearchFilterResult<T> {
  /**
   * Datos filtrados según el término de búsqueda
   */
  filteredData: T[];
  /**
   * Valor actual de búsqueda
   */
  searchValue: string;
  /**
   * Función para actualizar el valor de búsqueda
   */
  setSearchValue: (value: string) => void;
  /**
   * Indica si hay una búsqueda activa
   */
  isSearching: boolean;
  /**
   * Función para limpiar la búsqueda
   */
  clearSearch: () => void;
}

/**
 * Hook personalizado para filtrar datos basados en un término de búsqueda
 */
export function useSearchFilter<T extends Record<string, any>>({
  data,
  searchFields,
  initialSearchValue = '',
  customMatchFunction,
}: UseSearchFilterOptions<T>): UseSearchFilterResult<T> {
  const [searchValue, setSearchValue] = useState(initialSearchValue);

  // Determina si un elemento coincide con la búsqueda
  const matchesSearch = useCallback(
    (item: T, search: string): boolean => {
      // Si hay una función personalizada, usarla
      if (customMatchFunction) {
        return customMatchFunction(item, search);
      }

      // Si no hay término de búsqueda, devolver true
      if (!search.trim()) return true;

      // Convertir búsqueda a minúsculas para comparación insensible a mayúsculas
      const searchLower = search.toLowerCase();

      // Verificar si alguno de los campos especificados contiene el término de búsqueda
      return searchFields.some((field) => {
        const value = item[field];

        // Manejar diferentes tipos de valores
        if (value === null || value === undefined) return false;

        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchLower);
        }

        if (typeof value === 'number' || typeof value === 'boolean') {
          return String(value).toLowerCase().includes(searchLower);
        }

        // Para objetos complejos, convertir a string y buscar
        return JSON.stringify(value).toLowerCase().includes(searchLower);
      });
    },
    [searchFields, customMatchFunction],
  );

  // Filtrar datos basados en el término de búsqueda
  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!searchValue.trim()) return data;

    return data.filter((item) => matchesSearch(item, searchValue));
  }, [data, searchValue, matchesSearch]);

  // Función para limpiar la búsqueda
  const clearSearch = useCallback(() => {
    setSearchValue('');
  }, []);

  return {
    filteredData,
    searchValue,
    setSearchValue,
    isSearching: searchValue.trim() !== '',
    clearSearch,
  };
}
