import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const navLinks = [
  { to: '/',         label: 'Home'     },
  { to: '/services', label: 'Services' },
  { to: '/gallery',  label: 'Gallery'  },
  { to: '/booking',  label: 'Book Now' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [location])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-50 bg-base-100/95 backdrop-blur-md shadow-sm border-b border-secondary/30"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="flex items-center justify-between max-w-6xl mx-auto px-4 h-16">

        {/* Brand */}
        <Link to="/" className="flex flex-col leading-tight shrink-0">
          <span className="font-serif text-base sm:text-lg font-bold text-primary tracking-wide">
            A <span className="text-xl sm:text-2xl">Bold</span> Beauty
          </span>
          <span className="text-[9px] sm:text-[10px] text-base-content/50 tracking-[0.15em] uppercase -mt-0.5">
            Cosmetic Clinic
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-primary text-primary-content'
                    : 'text-base-content hover:bg-accent hover:text-accent-content'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link to="/booking" className="btn btn-primary btn-sm rounded-full ml-2">
            Book Now
          </Link>
        </nav>

        {/* Hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg hover:bg-base-200 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-base-content" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 top-16 bg-black/40 z-40"
            onClick={() => setMenuOpen(false)}
          />
          {/* Menu panel */}
          <div className="md:hidden absolute top-full left-0 right-0 bg-base-100 border-t border-secondary/30 z-50 shadow-xl"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-content'
                        : 'text-base-content hover:bg-base-200'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <Link
                to="/booking"
                className="btn btn-primary rounded-xl mt-2 w-full text-base"
              >
                Book Appointment
              </Link>
            </nav>
          </div>
        </>
      )}
    </header>
  )
}
