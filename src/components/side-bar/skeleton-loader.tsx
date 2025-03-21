import { Skeleton } from "@/components/ui/skeleton"
import { ChevronRight } from "lucide-react"
import clsx from "clsx"

export function SidebarSkeleton({ isOpen }: { isOpen: boolean }) {
  return (
    <aside
      className={clsx(
        'hidden md:flex flex-col h-screen transition-all duration-300 bg-white border-r border-gray-200',
        isOpen ? 'w-64' : 'w-20 items-center',
      )}
    >
      {/* Toggle Button */}
      <div className="flex items-center p-2">
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>

      {/* Logo */}
      <div className="mb-2 flex h-20 items-center justify-center p-4">
        <Skeleton className="h-16 w-16" />
      </div>

      {/* Navigation */}
      <nav className={clsx('flex flex-col grow mt-3 space-y-2 px-2', !isOpen && 'items-center')}>
        {/* Regular navigation items */}
        {[...Array(3)].map((_, index) => (
          <Skeleton
            key={`nav-${index}`}
            className={clsx(
              'h-10 rounded-md',
              isOpen ? 'w-full' : 'w-10'
            )}
          />
        ))}

        {/* Item with submenu (expanded) */}
        {isOpen && (
          <div className="space-y-2">
            <div className="flex justify-between items-center w-full">
              <Skeleton className="h-10 w-5/6 rounded-md" />
              <ChevronRight className="h-4 w-4 text-gray-300" />
            </div>
            {/* Submenu items */}
            <div className="pl-6 space-y-2">
              {[...Array(2)].map((_, index) => (
                <Skeleton
                  key={`submenu-${index}`}
                  className="h-8 w-5/6 rounded-md"
                />
              ))}
            </div>
          </div>
        )}

        {/* More navigation items */}
        {[...Array(2)].map((_, index) => (
          <Skeleton
            key={`nav-extra-${index}`}
            className={clsx(
              'h-10 rounded-md',
              isOpen ? 'w-full' : 'w-10'
            )}
          />
        ))}
      </nav>
    </aside>
  )
}