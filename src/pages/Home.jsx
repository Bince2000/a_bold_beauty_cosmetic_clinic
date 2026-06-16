import { Link } from 'react-router-dom'

const features = [
  { icon: '💄', title: 'Permanent Makeup',  desc: 'Long-lasting brows, lips, and liner by certified artists.' },
  { icon: '👁️', title: 'Lash Extensions',   desc: 'Classic, volume, hybrid, and Korean lash lift services.' },
  { icon: '✨',  title: 'Advanced Facials',  desc: 'Hydra facials, microdermabrasion, and skin needling.' },
  { icon: '🔬', title: 'Laser Treatments',  desc: 'State-of-the-art laser for hair removal, pigmentation & more.' },
]

const testimonials = [
  { name: 'Sophie R.',  text: 'My nano brows look absolutely natural. I wake up with perfect brows every day!',         rating: 5 },
  { name: 'Aisha K.',   text: 'The bridal makeup was stunning — exactly the look I dreamed of for my wedding day.',      rating: 5 },
  { name: 'Jessica M.', text: 'The hydra facial left my skin glowing for weeks. Best beauty clinic in Melbourne!',       rating: 5 },
]

const serviceHighlights = [
  { title: 'Bridal Makeup',      icon: '👰', desc: 'Flawless, camera-ready bridal looks for your special day.',    category: 'Cosmetic Makeup'  },
  { title: 'Laser Hair Removal', icon: '🔬', desc: 'Permanent hair reduction with the latest laser technology.',    category: 'Laser Treatment'  },
  { title: 'Ombré Brows',        icon: '🤎', desc: 'Soft powder brows for a naturally defined, polished look.',     category: 'Permanent Makeup' },
]

export default function Home() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-base-300 via-accent/40 to-base-100 py-16 sm:py-24 md:py-36">
        <div className="absolute -top-20 -left-20 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {/* 10% OFF badge */}
          <div className="inline-flex items-center gap-2 bg-primary text-primary-content rounded-full px-4 sm:px-5 py-2 text-sm font-semibold mb-5 shadow-md">
            🎉 10% OFF on your First Visit!
          </div>

          <h1 className="hero-title mb-3">
            A <span className="italic">Bold</span> Beauty
          </h1>
          <p className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase text-base-content/50 mb-3 font-medium">
            Cosmetic Clinic · Melbourne, VIC
          </p>
          <p className="text-lg sm:text-xl md:text-2xl text-base-content/70 font-light italic mb-2">
            Enhancing Your Natural Beauty
          </p>
          <p className="text-xs sm:text-sm text-base-content/50 mb-8 sm:mb-10 tracking-widest uppercase">
            Look Bold. Feel Beautiful. Be You.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/booking" className="btn btn-primary btn-lg rounded-full px-8 shadow-lg w-full sm:w-auto">
              Book Appointment
            </Link>
            <Link to="/services" className="btn btn-outline btn-primary btn-lg rounded-full px-8 w-full sm:w-auto">
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Features ─────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="section-title">What We Offer</h2>
          <p className="section-subtitle">Specialised cosmetic treatments by certified professionals</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="card bg-base-200 border border-secondary/20 shadow-sm card-hover">
              <div className="card-body items-center text-center gap-2 p-4 sm:p-6">
                <div className="text-3xl sm:text-4xl">{icon}</div>
                <h3 className="font-serif font-semibold text-sm sm:text-base text-primary leading-tight">{title}</h3>
                <p className="text-xs sm:text-sm text-base-content/60 leading-relaxed hidden sm:block">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Service Highlights ───────────────────────────────────── */}
      <section className="bg-base-200/60 py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="section-title">Most Loved Services</h2>
            <p className="section-subtitle">Trusted by hundreds of clients across Melbourne</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {serviceHighlights.map(({ title, icon, desc, category }) => (
              <div key={title} className="card bg-base-100 shadow-sm border border-secondary/20 card-hover">
                <div className="card-body p-5 sm:p-6">
                  <div className="text-3xl mb-2">{icon}</div>
                  <span className="badge badge-secondary badge-sm mb-1">{category}</span>
                  <h3 className="card-title font-serif text-primary text-base sm:text-lg">{title}</h3>
                  <p className="text-sm text-base-content/60 flex-1">{desc}</p>
                  <div className="card-actions mt-4">
                    <Link to="/services" className="btn btn-sm btn-outline btn-primary rounded-full">Learn More</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-10">
            <Link to="/services" className="btn btn-primary rounded-full px-8 w-full sm:w-auto">View All Services</Link>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="section-title">Client Love</h2>
          <p className="section-subtitle">Real results, real stories from our Melbourne clients</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map(({ name, text, rating }) => (
            <div key={name} className="card bg-base-200 border border-secondary/20 shadow-sm">
              <div className="card-body gap-3 p-5">
                <div className="flex gap-0.5">
                  {Array.from({ length: rating }).map((_, i) => (
                    <span key={i} className="text-warning text-lg">★</span>
                  ))}
                </div>
                <p className="text-sm text-base-content/70 italic leading-relaxed">"{text}"</p>
                <div className="flex items-center gap-3 mt-1">
                  <div className="avatar placeholder">
                    <div className="bg-primary text-primary-content rounded-full w-9 h-9 flex items-center justify-center">
                      <span className="text-sm font-semibold">{name[0]}</span>
                    </div>
                  </div>
                  <span className="font-medium text-sm">{name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA Banner ───────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-primary to-secondary py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="badge bg-white text-primary border-0 text-base font-bold px-5 py-3 mb-5 shadow">
            🎁 10% OFF — First Visit
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Look Bold & Feel Beautiful?
          </h2>
          <p className="text-white/80 mb-7 text-base sm:text-lg font-light">
            Book your first appointment today and enjoy 10% off any service.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/booking" className="btn btn-lg bg-white text-primary hover:bg-base-200 rounded-full px-8 border-0 shadow-lg w-full sm:w-auto">
              Book Now — It's Easy!
            </Link>
            <a href="tel:04XXXXXXXX" className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary rounded-full px-8 w-full sm:w-auto">
              📞 Call Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
