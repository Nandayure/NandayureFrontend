"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

interface FolderEmptyProps {
  onRefresh: () => void
}

const FolderEmpty = ({ onRefresh }: FolderEmptyProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Employee Files</h2>
        <Button variant="outline" size="sm" onClick={onRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>
      <Alert>
        <AlertDescription>No folders found for this employee.</AlertDescription>
      </Alert>
    </div>
  )
}

export default FolderEmpty

