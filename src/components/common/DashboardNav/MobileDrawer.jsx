import Link from 'next/link'

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

export default function MobileDrawer({ items, activeLabel, onClose }) {
  return (
    <div className="fixed top-16 inset-x-0 z-49 bg-white/98 backdrop-blur-xl border-b border-black/8 px-4 pt-3 pb-5 flex flex-col gap-1">
      {items.map((item) => (
        <MobileNavItem
          key={item.label}
          item={item}
          active={activeLabel === item.label}
          onClick={onClose}
        />
      ))}
    </div>
  )
}
