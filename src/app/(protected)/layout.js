import DashboardNav from '@/components/common/DashboardNav'

export default function ProtectedLayout({ children }) {
  return (
    <>
      <DashboardNav />
      <main style={{ paddingTop: '64px' }}>{children}</main>
    </>
  )
}
