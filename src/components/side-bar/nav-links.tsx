"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import clsx from "clsx"
import { motion, AnimatePresence } from "framer-motion"

export interface SubLink {
  href: string
  label: string
  dataCy?: string
}

export interface NavLink {
  href: string
  icon: React.ElementType
  label: string
  dataCy?: string
  subLinks?: Record<string, SubLink>
}

interface Props {
  isOpen: boolean
  navLinks: Record<string, NavLink>
  onLinkClick?: () => void
}

export function NavLinks({ isOpen, navLinks, onLinkClick }: Props) {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null)
  const pathname = usePathname()

  return (
    <div className="flex flex-col space-y-1 w-full">
      {Object.entries(navLinks).map(([key, link]) => {
        const isActive = pathname === link.href
        const hasSubLinks = link.subLinks && Object.keys(link.subLinks).length > 0
        const isSubMenuOpen = openSubMenu === key

        // Check if any sublink is active
        const isSubLinkActive =
          hasSubLinks && Object.values(link.subLinks!).some((subLink) => pathname === subLink.href)

        if (hasSubLinks) {
          // This is a link with sublinks - should toggle submenu
          return (
            <div key={key} className="w-full">
              <Button
                data-cy={link.dataCy}
                variant="ghost"
                className={clsx(
                  "flex items-center justify-between w-full h-10 px-3 rounded-md transition-all duration-200 cursor-pointer",
                  isActive || isSubLinkActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100",
                  !isOpen && "justify-center px-2",
                )}
                onClick={() => setOpenSubMenu(isSubMenuOpen ? null : key)}
              >
                <div className="flex items-center min-w-0">
                  <link.icon
                    className={clsx(
                      "h-[18px] w-[18px] shrink-0 transition-colors duration-200",
                      isActive || isSubLinkActive ? "text-blue-600" : "text-gray-700",
                    )}
                  />
                  {isOpen && (
                    <span
                      className={clsx(
                        "ml-3 text-sm truncate transition-colors duration-200",
                        isActive || isSubLinkActive ? "text-blue-600 font-medium" : "text-gray-700",
                      )}
                    >
                      {link.label}
                    </span>
                  )}
                </div>
                {isOpen && (
                  <motion.div
                    animate={{ rotate: isSubMenuOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-2 shrink-0"
                  >
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                  </motion.div>
                )}
              </Button>

              {isOpen && (
                <AnimatePresence>
                  {isSubMenuOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pl-6 mt-1 mb-1 space-y-1 border-l-2 border-gray-200 ml-3">
                        {Object.entries(link.subLinks!).map(([subKey, subLink]) => {
                          const isSubLinkActive = pathname === subLink.href

                          return (
                            <Button
                              key={subKey}
                              data-cy={subLink.dataCy}
                              variant="ghost"
                              size="sm"
                              className={clsx(
                                "w-full flex items-center justify-start h-9 px-3 rounded-md transition-all duration-200",
                                isSubLinkActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100",
                              )}
                              asChild
                              onClick={onLinkClick}
                            >
                              <Link href={subLink.href}>
                                <motion.span
                                  initial={{ x: -5, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ duration: 0.2, delay: 0.05 }}
                                  className={clsx(
                                    "text-sm truncate transition-colors duration-200",
                                    isSubLinkActive ? "text-blue-600 font-medium" : "text-gray-700",
                                  )}
                                >
                                  {subLink.label}
                                </motion.span>
                              </Link>
                            </Button>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          )
        } else {
          return (
            <Button
              key={key}
              data-cy={link.dataCy}
              variant="ghost"
              className={clsx(
                "flex items-center justify-start w-full h-10 px-3 rounded-md transition-all duration-200",
                isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100",
                !isOpen && "justify-center px-2",
              )}
              asChild
              onClick={onLinkClick}
            >
              <Link href={link.href} className="flex items-center min-w-0">
                <link.icon
                  className={clsx(
                    "h-[18px] w-[18px] shrink-0 transition-colors duration-200",
                    isActive ? "text-blue-600" : "text-gray-700",
                  )}
                />
                {isOpen && (
                  <span
                    className={clsx(
                      "ml-3 text-sm truncate transition-colors duration-200",
                      isActive ? "text-blue-600 font-medium" : "text-gray-700",
                    )}
                  >
                    {link.label}
                  </span>
                )}
              </Link>
            </Button>
          )
        }
      })}
    </div>
  )
}

