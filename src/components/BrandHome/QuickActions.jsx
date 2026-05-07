import Link from 'next/link'

const ACTIONS = [
  {
    label: 'Create new campaign',
    href: '/campaigns/create',
    primary: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0">
        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
  },
  {
    label: 'Browse all creators',
    href: '/discover',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0 opacity-60">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    label: 'Message shortlisted',
    href: '/messages',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0 opacity-60">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    label: 'View applications',
    href: '/applications',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0 opacity-60">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
]

export default function QuickActions() {
  return (
    <div className="bg-white border border-(--border) rounded-2xl px-4 pt-3.5 pb-3.5">
      <h2 className="font-serif text-[17px] font-normal text-(--ink) mb-2.5">Quick actions</h2>

      <div className="flex flex-col gap-1.5">
        {ACTIONS.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className={[
              'flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-[13px] no-underline transition-colors duration-200',
              action.primary
                ? 'border-(--ink) bg-(--ink) text-white hover:bg-[#2a2a2a]'
                : 'border-(--border) text-(--ink2) hover:bg-(--cream) hover:text-(--ink)',
            ].join(' ')}
          >
            {action.icon}
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
