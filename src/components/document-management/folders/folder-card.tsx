"use client"

import { Folder } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"

interface FolderProps {
  folder: {
    id: string
    name: string
    [key: string]: any
  }
  path: string
  index?: number
}

// Animation variants
const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 0.5
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
}

const FolderCard = ({ folder, path, index = 0 }: FolderProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      variants={item}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      layout
    >
      <Card
        className={cn(
          "overflow-hidden transition-all duration-200",
          isHovered ? "border-primary shadow-md" : ""
        )}
      >
        <CardContent className="p-4">
          <Link
            href={{
              pathname: `${path}/${folder.id}`,
              query: { folderName: encodeURIComponent(folder.name) }
            }}
            className="w-full text-left space-y-2 block"
          >
            <div className="flex items-center gap-3">

              <Folder className="h-5 w-5 text-primary" />
              <motion.span
                className="font-medium"
                animate={{ color: isHovered ? 'var(--primary)' : '' }}
                transition={{ duration: 0.2 }}
              >
                {folder.name}
              </motion.span>
            </div>
            <motion.p
              className="text-sm text-muted-foreground pl-8"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: isHovered ? 1 : 0.7 }}
              transition={{ duration: 0.2 }}
            >
              Haga clic para ver detalles
            </motion.p>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default FolderCard