'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Settings, Menu, X } from 'lucide-react'
import { navItems } from '@/constants/navItems'
import NavItem from './NavItem'
import MobileDrawer from './MobileDrawer'

export default function DashboardNav() {
  const pathname = usePathname()
  const [role, setRole] = useState('creator')
  const [menuOpen, setMenuOpen] = useState(false)

  const activeItem = navItems.find(
    (item) => pathname === item.href || pathname.startsWith(item.href + '/')
  )

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-white/97 backdrop-blur-xl border-b border-black/8 h-16 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 flex items-center gap-4">

          {/* Logo */}
          <Link href="/home" className="flex items-center gap-2 shrink-0 no-underline">
            <div className="w-8 h-8 bg-(--ink) rounded-lg flex items-center justify-center shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-(--red) block" />
            </div>
            <span
              className="text-lg font-medium text-(--ink) tracking-wide whitespace-nowrap"
              style={{ fontFamily: 'var(--serif)' }}
            >
              CollabXSphere
            </span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-55 relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-(--ink3) pointer-events-none" />
            <input
              type="text"
              placeholder="Search creators, brands..."
              className="w-full py-1.5 pl-8 pr-3 text-xs bg-(--warm) border border-transparent rounded-full text-(--ink) outline-none focus:border-black/20 transition-colors duration-200"
              style={{ fontFamily: 'var(--sans)' }}
            />
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-8 pb-0.5">
            {navItems.map((item) => (
              <NavItem key={item.label} item={item} active={activeItem?.label === item.label} />
            ))}
          </nav>

          {/* Desktop right controls */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* Role toggle */}
            <div className="flex items-center bg-(--warm) rounded-full p-0.5 gap-0.5">
              {['brand', 'creator'].map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`px-3.5 py-1 text-[0.7rem] font-semibold tracking-wide capitalize rounded-full border-none cursor-pointer transition-all duration-200 ${
                    role === r ? 'bg-white text-(--ink) shadow-sm' : 'bg-transparent text-(--ink3)'
                  }`}
                  style={{ fontFamily: 'var(--sans)' }}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>

            {/* Settings */}
            <button className="w-8.5 h-8.5 rounded-full border border-black/15 bg-transparent flex items-center justify-center cursor-pointer text-(--ink3) hover:border-black/35 hover:text-(--ink) transition-all duration-200">
              <Settings size={15} />
            </button>

            {/* Avatar */}
            <button className="w-8.5 h-8.5 rounded-full bg-(--ink) border-none flex items-center justify-center cursor-pointer">
              <span className="text-[0.75rem] font-bold text-white uppercase" style={{ fontFamily: 'var(--sans)' }}>P</span>
            </button>
          </div>

          {/* Mobile right: avatar + hamburger */}
          <div className="flex md:hidden ml-auto items-center gap-2 shrink-0">
            <button className="w-8.5 h-8.5 rounded-full bg-(--ink) border-none flex items-center justify-center cursor-pointer">
              <span className="text-[0.75rem] font-bold text-white uppercase" style={{ fontFamily: 'var(--sans)' }}>P</span>
            </button>
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
          activeLabel={activeItem?.label}
          role={role}
          setRole={setRole}
          onClose={() => setMenuOpen(false)}
        />
      )}
    </>
  )
}
