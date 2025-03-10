"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { exportDashboardToExcel, exportDashboardToCSV } from "@/utils/dashboard-export-utils"

interface DashboardExportButtonProps {
  summaryData: any
  isDisabled?: boolean
}

export default function DashboardExportButton({ summaryData, isDisabled = false }: DashboardExportButtonProps) {
  const handleExport = (format: "excel" | "csv") => {
    const fileName = `dashboard-solicitudes_${new Date().toISOString().split("T")[0]}`

    if (format === "excel") {
      exportDashboardToExcel(summaryData, fileName)
    } else {
      exportDashboardToCSV(summaryData, fileName)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1" disabled={isDisabled}>
          <Download className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport("excel")}>Excel (.xlsx)</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("csv")}>CSV</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

