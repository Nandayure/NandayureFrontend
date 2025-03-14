"use client"
import clsx from "clsx"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useSidebarStore } from "@/store/useSidebarStore"

import { NavLinks, type NavLink } from "@/components/side-bar/nav-links"

interface DesktopSidebarProps {
  navLinks: Record<string, NavLink>
}

export function DesktopSidebar({ navLinks }: DesktopSidebarProps) {
  const { isOpen, MenuIsOpen, MenuIsClose } = useSidebarStore()

  const toggleSidebar = () => {
    isOpen ? MenuIsClose() : MenuIsOpen()
  }

  return (
    <aside
      className={clsx(
        "hidden md:flex flex-col h-screen transition-all duration-300 ease-in-out bg-white border-r border-gray-200 shadow-sm",
        isOpen ? "w-64" : "w-20 items-center",
      )}
    >
      <div className="flex items-center p-3 ">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 active:scale-95"
          aria-label="Toggle Sidebar"
        >
          {isOpen ? (
            <X size={22} className="text-gray-700 transition-transform duration-200" />
          ) : (
            <Menu size={22} className="text-gray-700 transition-transform duration-200" />
          )}
        </button>
      </div>

      <Link
        href="/"
        className="mb-4 flex h-20 items-center justify-center p-4 transition-transform duration-200 hover:scale-105"
      >
        <Image
          src="/LogoMuni.png"
          alt="logo"
          width={isOpen ? 100 : 80}
          height={isOpen ? 100 : 80}
          className="transition-all duration-300"
          priority
        />
      </Link>

      <nav
        className={clsx(
          "flex flex-col flex-grow mt-2 px-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent",
          !isOpen && "items-center",
        )}
      >
        <NavLinks isOpen={isOpen} navLinks={navLinks} />
      </nav>
    </aside>
  )
}

