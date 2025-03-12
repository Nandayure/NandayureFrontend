"use client"

import { motion } from "framer-motion"
import FolderCard from "./folder-card"

interface Folder {
  id: string
  name: string
  [key: string]: any
}

interface FolderGridProps {
  folders: Folder[],
  path: string
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      duration: 0.3,
      ease: "easeInOut"
    }
  }
}

const FolderGrid = ({ folders, path }: FolderGridProps) => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      {folders.map((folder, index) => (
        <FolderCard
          path={path}
          key={folder.id}
          folder={folder}
          index={index}
        />
      ))}
    </motion.div>
  )
}

export default FolderGrid

