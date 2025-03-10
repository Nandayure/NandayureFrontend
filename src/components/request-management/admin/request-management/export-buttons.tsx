"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { RequestDetails } from "@/types/request-management/commonTypes"
import { exportToCSV, exportToExcel, prepareDataForExport } from "@/utils/export-utils"

interface ExportButtonsProps {
  requests: RequestDetails[]
  isDisabled?: boolean
}

export default function ExportButtons({ requests, isDisabled = false }: ExportButtonsProps) {
  const handleExport = (format: "excel" | "csv") => {
    const data = prepareDataForExport(requests)
    const fileName = `solicitudes_${new Date().toISOString().split("T")[0]}`

    if (format === "excel") {
      exportToExcel(data, fileName)
    } else {
      exportToCSV(data, fileName)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          disabled={isDisabled || requests.length === 0}
        >
          <Download className="h-4 w-4" />
          Exportar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport("excel")}>Excel (.xlsx)</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("csv")}>CSV</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

