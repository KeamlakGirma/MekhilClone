import { Link, NavLink, useLocation } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { useModal } from '../../context/ModalContext.jsx'
import Logo from '../ui/Logo.jsx'

function Dropdown({ label, items, onNavigate }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`nav-pill ${open ? 'nav-pill-active' : 'nav-pill-idle'} flex items-center gap-1`}
      >
        {label}
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white shadow-card rounded-lg py-2 z-50 border border-gray-100">
          {items.map((it) => (
            <button
              key={it.label}
              onClick={() => { setOpen(false); onNavigate?.(it) }}
              className="w-full text-left px-4 py-2 text-sm text-navy hover:bg-cyan/10"
            >
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const { isAuthed, user, logout } = useAuth()
  const { open } = useModal()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const oppItems = [
    { label: 'Collaborations (Grow Faster)', to: '/opportunities' },
    { label: 'Discussions/Community', to: '/social' },
  ]

  const closerItems = [
    { label: 'About Us', to: '/about' },
    { label: 'Why Us?', to: '/why-us' },
    { label: 'FAQ', to: '/faq' },
    { label: 'Blog', to: '/blog' },
  ]

  const infoItems = closerItems

  const navigateTo = (it) => {
    if (it.to) window.location.href = it.to
  }

  return (
    <header className="bg-white">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-8 py-4">
        <Link to="/home" className="flex items-center">
          <Logo />
        </Link>

        <nav className="flex items-center gap-2">
          <NavLink to="/home" className={`nav-pill ${isActive('/home') || isActive('/') ? 'nav-pill-active' : 'nav-pill-idle'}`}>Home</NavLink>
          <NavLink to="/courses" className={`nav-pill ${isActive('/courses') ? 'nav-pill-active' : 'nav-pill-idle'}`}>Courses</NavLink>
          <NavLink to="/masterclass" className={`nav-pill ${isActive('/masterclass') ? 'nav-pill-active' : 'nav-pill-idle'}`}>Masterclass</NavLink>

          {isAuthed ? (
            <>
              <NavLink to="/business-directory" className={`nav-pill ${isActive('/business-directory') ? 'nav-pill-active' : 'nav-pill-idle'}`}>Business Directory</NavLink>
              <Dropdown label="Opportunities" items={oppItems} onNavigate={navigateTo} />
              <Dropdown label="Getting Closer" items={closerItems} onNavigate={navigateTo} />
              <Dropdown
                label="Me"
                items={[
                  { label: 'Inbox', to: '/social' },
                  { label: 'Profile', to: '/profile' },
                  { label: 'Account', to: '/account' },
                  { label: 'Sign out', action: 'logout' },
                ]}
                onNavigate={(it) => it.action === 'logout' ? logout() : navigateTo(it)}
              />
            </>
          ) : (
            <>
              <Dropdown label="Information" items={infoItems} onNavigate={navigateTo} />
              <Dropdown label="Opportunities" items={oppItems} onNavigate={navigateTo} />
              <button onClick={() => open('login')} className="nav-pill nav-pill-idle">Log In</button>
              <button onClick={() => open('signup')} className="nav-pill nav-pill-active">Create new account</button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}