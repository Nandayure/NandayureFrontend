"use client"

import { Folder } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface FolderProps {
  folder: {
    id: string
    name: string
    [key: string]: any
  }
}

const FolderCard = ({ folder }: FolderProps) => {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-200 hover:border-primary/50",
      )}
    >
      <CardContent className="p-4">
        <Link 
          href={`/my-file/${folder.id}`} 
          className="w-full text-left space-y-2 block"
        >
          <div className="flex items-center gap-3">
            <Folder className="h-5 w-5 text-primary/70" />
            <span className="font-medium">{folder.name}</span>
          </div>
          <p className="text-sm text-muted-foreground pl-8">Haga clic para ver detalles</p>
        </Link>
      </CardContent>
    </Card>
  )
}

export default FolderCard