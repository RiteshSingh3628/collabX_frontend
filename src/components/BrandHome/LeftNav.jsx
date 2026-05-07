'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/home',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-4.25 h-4.25">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    ),
  },
  {
    label: 'Discover creators',
    href: '/discover',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-4.25 h-4.25">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    label: 'Shortlisted',
    href: '/shortlisted',
    badge: '8',
    badgeVariant: 'default',
    dividerBefore: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-4.25 h-4.25">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      </svg>
    ),
  },
  {
    label: 'My campaigns',
    href: '/campaigns',
    badge: '3',
    badgeVariant: 'green',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-4.25 h-4.25">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    label: 'Applications',
    href: '/applications',
    badge: '24',
    badgeVariant: 'blue',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-4.25 h-4.25">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    label: 'Payments',
    href: '/payments',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-4.25 h-4.25">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    label: 'Brand profile',
    href: '/brand',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-4.25 h-4.25">
        <rect x="3" y="3" width="18" height="12" rx="2" /><path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
]

const BADGE_BG = {
  default: 'bg-(--red)',
  green: 'bg-(--green)',
  blue: 'bg-(--blue)',
}

export default function LeftNav() {
  const pathname = usePathname()

  return (
    <nav className="bg-white border border-(--border) rounded-2xl py-2">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
        const badgeBg = BADGE_BG[item.badgeVariant] ?? BADGE_BG.default

        return (
          <div key={item.href}>
            {item.dividerBefore && <div className="h-px bg-(--border) my-1.5" />}
            <Link
              href={item.href}
              className={[
                'flex items-center gap-2.75 px-4.5 py-2.5 text-[13.5px] relative no-underline transition-colors duration-150',
                isActive
                  ? 'text-(--ink) font-medium'
                  : 'text-(--ink2) hover:bg-(--cream) hover:text-(--ink)',
              ].join(' ')}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-(--red) rounded-r-sm" />
              )}
              <span className={`shrink-0 ${isActive ? 'opacity-100' : 'opacity-55'}`}>
                {item.icon}
              </span>
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className={`text-[10px] font-semibold px-1.75 py-0.5 rounded-full text-white ${badgeBg}`}>
                  {item.badge}
                </span>
              )}
            </Link>
          </div>
        )
      })}
    </nav>
  )
}
