"use client"
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

const FolderGrid = ({ folders, path }: FolderGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {folders.map((folder) => (
        <FolderCard
          path={path}
          key={folder.id}
          folder={folder}
        />
      ))}
    </div>
  )
}

export default FolderGrid

