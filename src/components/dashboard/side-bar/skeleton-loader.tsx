import { Skeleton } from "@/components/ui/skeleton"

export function SidebarSkeleton({ isOpen }: { isOpen: boolean }) {
  return (
    <aside
      className={`hidden md:flex flex-col h-screen transition-all duration-300 bg-white border-r border-gray-200 ${
        isOpen ? 'w-64' : 'w-20 items-center'
      }`}
    >
      <div className="flex items-center p-2">
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>

      <div className="mb-2 flex h-20 items-center justify-center p-4">
        <Skeleton className="h-16 w-16" />
      </div>

      <nav className={`flex flex-col flex-grow ${!isOpen && 'items-center'}`}>
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center mb-2 px-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            {isOpen && <Skeleton className="h-4 w-24 ml-2" />}
          </div>
        ))}
      </nav>
    </aside>
  )
}