import Link from 'next/link'

export default function NavItem({ item, active }) {
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      className="relative flex flex-col items-center gap-0.5 group no-underline"
    >
      <div className="relative">
        <Icon
          size={20}
          className={`transition-colors duration-200 group-hover:text-(--ink) ${active ? 'text-(--ink)' : 'text-(--ink3)'}`}
        />
        {item.badge !== null && (
          <span className="absolute -top-1.5 -right-2 bg-(--red) text-white text-[0.6rem] font-bold rounded-full min-w-4 h-4 flex items-center justify-center px-1 leading-none">
            {item.badge}
          </span>
        )}
      </div>

      <span
        className={`text-[0.65rem] tracking-wide transition-colors duration-200 group-hover:text-(--ink) ${active ? 'font-semibold text-(--ink)' : 'font-normal text-(--ink3)'}`}
        style={{ fontFamily: 'var(--sans)' }}
      >
        {item.label}
      </span>

      {active && (
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-full h-0.5 bg-(--ink) rounded-t" />
      )}
    </Link>
  )
}
