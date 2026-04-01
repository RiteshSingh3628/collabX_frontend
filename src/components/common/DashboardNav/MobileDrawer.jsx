import Link from 'next/link'
import { Settings } from 'lucide-react'
import { navItems } from '@/constants/navItems'

function MobileNavItem({ item, active, onClick }) {
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`no-underline flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-150 ${active ? 'bg-(--warm)' : 'hover:bg-(--warm)/60'}`}
    >
      <div className="relative">
        <Icon
          size={20}
          className={active ? 'text-(--ink)' : 'text-(--ink3)'}
        />
        {item.badge !== null && (
          <span className="absolute -top-1.5 -right-2 bg-(--red) text-white text-[0.6rem] font-bold rounded-full min-w-4 h-4 flex items-center justify-center px-1 leading-none">
            {item.badge}
          </span>
        )}
      </div>
      <span
        className={`text-sm ${active ? 'font-semibold text-(--ink)' : 'font-normal text-(--ink3)'}`}
        style={{ fontFamily: 'var(--sans)' }}
      >
        {item.label}
      </span>
    </Link>
  )
}

export default function MobileDrawer({ activeLabel, role, setRole, onClose }) {
  return (
    <div className="fixed top-16 inset-x-0 z-49 bg-white/98 backdrop-blur-xl border-b border-black/8 px-4 pt-3 pb-5 flex flex-col gap-1">
      {navItems.map((item) => (
        <MobileNavItem
          key={item.label}
          item={item}
          active={activeLabel === item.label}
          onClick={onClose}
        />
      ))}

      <div className="h-px bg-black/8 my-2" />

      {/* Role toggle */}
      <div className="px-4 py-1">
        <p
          className="text-[0.65rem] font-semibold text-(--ink3) tracking-widest uppercase mb-2"
          style={{ fontFamily: 'var(--sans)' }}
        >
          View as
        </p>
        <div className="flex items-center bg-(--warm) rounded-full p-0.5 gap-0.5 w-fit">
          {['brand', 'creator'].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`px-5 py-1.5 text-[0.78rem] font-semibold tracking-wide capitalize rounded-full border-none cursor-pointer transition-all duration-200 ${
                role === r ? 'bg-white text-(--ink) shadow-sm' : 'bg-transparent text-(--ink3)'
              }`}
              style={{ fontFamily: 'var(--sans)' }}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Settings */}
      <button className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left bg-transparent border-none cursor-pointer hover:bg-(--warm)/60 transition-colors duration-150">
        <Settings size={20} className="text-(--ink3)" />
        <span className="text-sm text-(--ink3)" style={{ fontFamily: 'var(--sans)' }}>
          Settings
        </span>
      </button>
    </div>
  )
}
