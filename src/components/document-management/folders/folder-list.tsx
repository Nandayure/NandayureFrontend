"use client"

import { motion } from "framer-motion"
import { Folder, Calendar, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface FolderType {
  id: string
  name: string
  [key: string]: any
}

interface FolderListProps {
  folders: FolderType[]
  path: string
}

const FolderList = ({ folders, path }: FolderListProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  }

  return (
    <motion.div
      className="space-y-2 border rounded-lg overflow-hidden"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {folders.map((folder) => (
        <motion.div
          key={folder.id}
          variants={item}
          className={cn("border-b last:border-b-0 hover:bg-muted/50 transition-colors")}
        >
          <Link
            href={{
              pathname: `${path}/${folder.id}`,
              query: { folderName: encodeURIComponent(folder.name) },
            }}
            className="p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Folder className="h-5 w-5 text-primary/70" />
              <span className="font-medium">{folder.name}</span>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default FolderList

