import { Home, LogIn, MessageSquare, Bell } from 'lucide-react'
import { ROLES } from '@/lib/rbac'

// Items without a `role` are visible to every authenticated user.
// Items with a `role` only render when session.user.role matches.
export const navItems = [
  { label: 'Home', href: '/home', icon: Home, badge: null },
  { label: 'Campaigns', href: '/campaigns', icon: LogIn, badge: 3, role: ROLES.BRAND },
  { label: 'Messages', href: '/messages', icon: MessageSquare, badge: 5 },
  { label: 'Alerts', href: '/alerts', icon: Bell, badge: 12 },
]

export function filterNavItemsByRole(items, role) {
  const normalized = role?.toLowerCase()
  return items.filter((item) => !item.role || item.role === normalized)
}
