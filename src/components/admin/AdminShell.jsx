import { NavLink, Link, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: '▦', end: true },
  { to: '/admin/users', label: 'Users', icon: '👤' },
  { to: '/admin/enrollments', label: 'Enrollments', icon: '📚' },
  { to: '/admin/payments', label: 'Payments / Sales', icon: '💳' },
  { to: '/admin/reports', label: 'Reports', icon: '📊' },
  { to: '/admin/coupons', label: 'Coupons', icon: '🎟' },
  { to: '/admin/bundles', label: 'Bundles', icon: '📦' },
]

export default function AdminShell() {
  const { user, isAdmin, logout } = useAuth()

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-semibold text-navy mb-2">403 — Access denied</h1>
          <p className="text-gray-500 mb-6 text-sm">You don't have permission to view the admin panel.</p>
          <Link to="/home" className="btn-navy">← Back to site</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-60 bg-navy text-white flex flex-col">
        <div className="p-5 border-b border-white/10">
          <div className="text-xl font-bold tracking-wide">መክህል</div>
          <div className="text-[10px] tracking-[0.3em] text-cyan mt-0.5">ADMIN</div>
        </div>

        <nav className="flex-1 py-4">
          {NAV.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 text-sm transition-colors ${
                  isActive ? 'bg-cyan text-white font-semibold' : 'text-white/80 hover:bg-white/5'
                }`
              }
            >
              <span className="w-5 text-center">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 text-xs">
          <div className="text-white/60 mb-2 truncate">{user?.email}</div>
          <button onClick={logout} className="text-cyan hover:underline">Sign out</button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b px-8 py-4 flex items-center justify-between">
          <h1 className="text-navy font-semibold">Admin Panel</h1>
          <Link to="/home" className="text-sm text-navy hover:underline">← Back to public site</Link>
        </header>
        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}