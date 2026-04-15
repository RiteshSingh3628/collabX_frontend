import { Home, Compass, LogIn, MessageSquare, Bell } from 'lucide-react'

export const navItems = [
  { label: 'Home', href: '/home', icon: Home, badge: null },
  { label: 'Discover', href: '/discover', icon: Compass, badge: null },
  { label: 'Campaigns', href: '/campaigns', icon: LogIn, badge: 3 },
  { label: 'Messages', href: '/messages', icon: MessageSquare, badge: 5 },
  { label: 'Alerts', href: '/alerts', icon: Bell, badge: 12 },
]
