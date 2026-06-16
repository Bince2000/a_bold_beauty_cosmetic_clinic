import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-base-200 border-t border-secondary/30 mt-16 sm:mt-20"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="font-serif text-2xl font-bold text-primary mb-1">
              A <span className="text-3xl">Bold</span> Beauty
            </p>
            <p className="text-xs text-base-content/50 tracking-[0.18em] uppercase mb-3">Cosmetic Clinic</p>
            <p className="text-sm text-base-content/70 leading-relaxed italic max-w-xs">
              "Look Bold. Feel Beautiful. Be You."
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-base-content mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-y-2 gap-x-4 text-sm text-base-content/70">
              {[
                { to: '/',         label: 'Home'     },
                { to: '/services', label: 'Services' },
                { to: '/gallery',  label: 'Gallery'  },
                { to: '/booking',  label: 'Book Now' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="hover:text-primary transition-colors py-1 inline-block">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-base-content mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3 text-sm text-base-content/70">
              <li>
                <a href="tel:04XXXXXXXX" className="flex items-center gap-2 hover:text-primary transition-colors py-1">
                  <span className="text-base shrink-0">📞</span>
                  <span>04XX XXX XXX</span>
                </a>
              </li>
              <li>
                <a href="mailto:hello@aboldbeauty.com.au" className="flex items-start gap-2 hover:text-primary transition-colors py-1 break-all">
                  <span className="text-base shrink-0">✉️</span>
                  <span>hello@aboldbeauty.com.au</span>
                </a>
              </li>
              <li className="flex items-center gap-2 py-1">
                <span className="text-base shrink-0">📍</span>
                <span>Melbourne, VIC</span>
              </li>
              <li>
                <a href="https://instagram.com/aboldbeauty.au" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary transition-colors py-1">
                  <span className="text-base shrink-0">📸</span>
                  <span>@aboldbeauty.au</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider mt-8 mb-4 opacity-30" />
        <p className="text-center text-xs text-base-content/40">
          © {new Date().getFullYear()} A Bold Beauty Cosmetic Clinic. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
