'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
}: SearchBarProps) {
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (searchQuery) {
      setSearchQuery('');
    } 
  };

  return (
    <form className="flex items-center w-full max-w-sm space-x-2">
      <Input
        type="text"
        placeholder="Buscar por cédula"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button type="button" size="icon" onClick={handleButtonClick}>
        {searchQuery ? (
          <>
            <X className="h-4 w-4" />
            <span className="sr-only">Limpiar búsqueda</span>
          </>
        ) : (
          <>
            <Search className="h-4 w-4" />
            <span className="sr-only">Buscar</span>
          </>
        )}
      </Button>
    </form>
  );
}
