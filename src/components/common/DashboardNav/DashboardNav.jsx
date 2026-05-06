'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { Search, Menu, X, LogOut } from 'lucide-react'
import { navItems, filterNavItemsByRole } from '@/constants/navItems'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import NavItem from './NavItem'
import MobileDrawer from './MobileDrawer'
import { useSession } from "next-auth/react";
import getInitials from '@/lib/utils/getInitals'

export default function DashboardNav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const {data: session} = useSession();

  const visibleNavItems = filterNavItemsByRole(navItems, session?.user?.role)

  const activeItem = visibleNavItems.find(
    (item) => pathname === item.href || pathname.startsWith(item.href + '/')
  )

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-white/97 backdrop-blur-xl border-b border-black/8 h-16 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 flex items-center gap-4">

          {/* Logo */}
          <Link href="/home" className="flex items-start shrink-0 no-underline">
            <Image
              src="/headerlogo.png"
              alt="CollabXSphere"
              width={181}
              height={36}
              priority
              className="hidden md:block"
            />
            <Image
              src="/headerlogoMobile.png"
              alt="CollabXSphere"
              width={37}
              height={36}
              priority
              className="block md:hidden"
            />
          </Link>

          {/* Search */}
          <div className="flex-1  max-w-55 relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-(--ink3) pointer-events-none" />
            <input
              type="text"
              placeholder="Search creators, brands..."
              className="w-full py-1.5 pl-8 pr-3 text-xs bg-(--warm) border border-transparent rounded-full text-(--ink) outline-none focus:border-black/20 transition-colors duration-200"
              style={{ fontFamily: 'var(--sans)' }}
            />
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-10 pb-0.5">
            {visibleNavItems.map((item) => (
              <NavItem key={item.label} item={item} active={activeItem?.label === item.label} />
            ))}
          </nav>

          {/* Desktop right controls */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* Avatar with dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-8.5 h-8.5 rounded-full bg-(--ink) border-none flex items-center justify-center cursor-pointer">
                  <span className="text-[0.75rem] font-bold text-white uppercase" style={{ fontFamily: 'var(--sans)' }}>{getInitials(session?.user?.fullName) || 'U'}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-red-600 cursor-pointer bg-white focus:bg-red-50 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile right: avatar + hamburger */}
          <div className="flex md:hidden ml-auto items-center gap-2 shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-8.5 h-8.5 rounded-full bg-(--ink) border-none flex items-center justify-center cursor-pointer">
                  <span className="text-[0.75rem] font-bold text-white uppercase" style={{ fontFamily: 'var(--sans)' }}>{getInitials(session?.user?.fullName) || 'U'}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-red-600 cursor-pointer bg-white focus:bg-red-50 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
              className="w-8.5 h-8.5 rounded-lg border border-black/15 bg-transparent flex items-center justify-center cursor-pointer text-(--ink) hover:border-black/35 transition-all duration-200"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </div>
      </header>

      {menuOpen && (
        <MobileDrawer
          items={visibleNavItems}
          activeLabel={activeItem?.label}
          onClose={() => setMenuOpen(false)}
        />
      )}
    </>
  )
}
