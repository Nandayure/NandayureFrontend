import React from "react"

interface ItemsPerPageSelectorProps {
  value: number
  onChange: (value: number) => void
  options?: number[]
}

const defaultOptions = [ 10, 20, 50, 100]

const ItemsPerPageSelector: React.FC<ItemsPerPageSelectorProps> = ({ value, onChange, options = defaultOptions }) => {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="items-per-page" className="text-sm">Items por página:</label>
      <select
        id="items-per-page"
        className="border rounded px-2 py-1 text-sm"
        value={value}
        onChange={e => onChange(Number(e.target.value))}
      >
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  )
}

export default ItemsPerPageSelector
