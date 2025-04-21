import { memo } from "react"
import { SearchBar } from "@/components/ui/search-bar"

interface UserSearchBarProps {
  onSearch: (value: string) => void
  value: string
}

export const UserSearchBar = memo(function UserSearchBar({ onSearch, value }: UserSearchBarProps) {
  return (
    <SearchBar
      onSearch={onSearch}
      value={value}
      placeholder="Buscar usuarios..."
      className="max-w-md"
    />
  )
})