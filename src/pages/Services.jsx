import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'

const categories = [
  'All',
  'Permanent Makeup',
  'Cosmetic Makeup',
  'Eye Lash Extensions',
  'Brows',
  'Facials',
  'Laser Treatment',
]

const services = [
  // Permanent Makeup
  { id: 1,  category: 'Permanent Makeup',    icon: '💋', name: 'Lip Blush Tattoo',                         desc: 'Semi-permanent lip colour for a natural, fuller-looking pout.' },
  { id: 2,  category: 'Permanent Makeup',    icon: '✏️', name: 'Nano Brows / Strokes',                     desc: 'Ultra-fine hair-stroke brows for the most realistic, natural result.' },
  { id: 3,  category: 'Permanent Makeup',    icon: '🤎', name: 'Ombré Brows',                              desc: 'Soft powder gradient brows — defined tail, lighter at the front.' },
  { id: 4,  category: 'Permanent Makeup',    icon: '🎨', name: 'Combo Brows',                              desc: 'A blend of hair strokes and powder for dimension and depth.' },
  { id: 5,  category: 'Permanent Makeup',    icon: '👁️', name: 'Eye Liner',                                desc: 'Permanent eyeliner to define and enhance your eyes every day.' },
  { id: 6,  category: 'Permanent Makeup',    icon: '✨', name: 'BB Glow',                                  desc: 'Semi-permanent foundation treatment for a poreless, dewy finish.' },
  { id: 7,  category: 'Permanent Makeup',    icon: '🩹', name: 'Camouflage Tattoo (Scars / Stretch Marks)', desc: 'Skin-tone pigment to conceal scars and stretch marks.' },
  // Cosmetic Makeup
  { id: 8,  category: 'Cosmetic Makeup',     icon: '👰', name: 'Bridal Makeup',                            desc: 'Timeless, flawless bridal looks crafted to last your entire day.' },
  { id: 9,  category: 'Cosmetic Makeup',     icon: '🌙', name: 'Night Out / Party Makeup',                 desc: 'Glamorous looks that turn heads for any evening event.' },
  { id: 10, category: 'Cosmetic Makeup',     icon: '🎉', name: 'Party Makeup',                             desc: 'Bold and beautiful finishes for birthdays, events, and more.' },
  { id: 11, category: 'Cosmetic Makeup',     icon: '💇‍♀️', name: 'Hair Style, Buns & Curls with Extensions', desc: 'Elegant updos, curls, and styles using premium hair extensions.' },
  { id: 12, category: 'Cosmetic Makeup',     icon: '🌿', name: 'Nano Plasty Hair Keratin',                 desc: 'Advanced keratin treatment for silky, frizz-free hair for months.' },
  // Eye Lash Extensions
  { id: 13, category: 'Eye Lash Extensions', icon: '👁️', name: 'Classic Eye Lash Extensions',             desc: 'One extension per natural lash for a natural, defined look.' },
  { id: 14, category: 'Eye Lash Extensions', icon: '🌟', name: 'Volume Eye Lash Extensions',              desc: 'Multiple fine lashes per natural lash for a full, fluffy result.' },
  { id: 15, category: 'Eye Lash Extensions', icon: '💫', name: 'Hybrid Eye Lash Extensions',              desc: 'A mix of classic and volume for the perfect in-between look.' },
  { id: 16, category: 'Eye Lash Extensions', icon: '🇰🇷', name: 'Korean Eye Lash Lift',                  desc: 'Semi-permanent curl and lift treatment — no extensions needed.' },
  // Brows
  { id: 17, category: 'Brows',               icon: '🌿', name: 'Eye Brow Lamination & Henna Brows',       desc: 'Straightens and sets brow hairs for a fluffy, brushed-up style.' },
  { id: 18, category: 'Brows',               icon: '🎨', name: 'Tint Brows',                              desc: 'Brow tinting to deepen and define your natural brow colour.' },
  { id: 19, category: 'Brows',               icon: '🕯️', name: 'Eye Brow Wax',                           desc: 'Clean, precise brow shaping using warm wax.' },
  { id: 20, category: 'Brows',               icon: '✏️', name: 'Eye Brow Shaping / Correction',           desc: 'Professional reshaping to correct and perfect brow symmetry.' },
  // Facials
  { id: 21, category: 'Facials',             icon: '💎', name: 'Microdermabrasion',                       desc: 'Exfoliating treatment to resurface skin and reduce fine lines.' },
  { id: 22, category: 'Facials',             icon: '💧', name: 'Aquaglow Hydra Dermabrasion',             desc: 'Deep hydration facial combining exfoliation and serum infusion.' },
  { id: 23, category: 'Facials',             icon: '🔬', name: 'Skin Needling',                           desc: 'Collagen-induction therapy to rejuvenate and tighten the skin.' },
  { id: 24, category: 'Facials',             icon: '🌊', name: 'Hydra Facial',                            desc: 'Multi-step cleanse, exfoliate, extract, and hydrate.' },
  // Laser Treatment
  { id: 25, category: 'Laser Treatment',     icon: '⚡', name: 'Laser Hair Removal',                      desc: 'Long-lasting hair reduction for smooth, hair-free skin.' },
  { id: 26, category: 'Laser Treatment',     icon: '💡', name: 'LED Therapy',                             desc: 'Light therapy to treat acne, redness, and boost collagen.' },
  { id: 27, category: 'Laser Treatment',     icon: '⬛', name: 'Carbon Facial',                           desc: 'Laser carbon peel for deep cleanse, pore reduction, and glow.' },
  { id: 28, category: 'Laser Treatment',     icon: '🔥', name: 'Skin Tightening Treatment',               desc: 'Laser and RF technology to firm and lift sagging skin.' },
  { id: 29, category: 'Laser Treatment',     icon: '🧬', name: 'Exosomes Micro Needling',                 desc: 'Advanced skin regeneration combining micro needling + exosomes.' },
  { id: 30, category: 'Laser Treatment',     icon: '💉', name: 'Anti-Wrinkle Skin Treatment',             desc: 'Non-surgical treatment to smooth fine lines and wrinkles.' },
  { id: 31, category: 'Laser Treatment',     icon: '🎨', name: 'Tattoo Removal',                          desc: 'Safe and effective laser tattoo fading and full removal.' },
  { id: 32, category: 'Laser Treatment',     icon: '✨', name: 'Skin Rejuvenation',                       desc: 'Full laser resurfacing for a fresher, younger-looking complexion.' },
  { id: 33, category: 'Laser Treatment',     icon: '🌑', name: 'Pigment & Hyper Pigmentation Removal',   desc: 'Target dark spots, sun damage, and uneven skin tone.' },
  { id: 34, category: 'Laser Treatment',     icon: '🩸', name: 'Vascular Removal',                       desc: 'Laser treatment for spider veins and visible capillaries.' },
]

const categoryIcons = {
  'Permanent Makeup':    '💄',
  'Cosmetic Makeup':     '💋',
  'Eye Lash Extensions': '👁️',
  'Brows':               '🤎',
  'Facials':             '✨',
  'Laser Treatment':     '🔬',
}

export default function Services() {
  const [active, setActive] = useState('All')
  const scrollRef = useRef(null)

  const filtered = active === 'All' ? services : services.filter(s => s.category === active)

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-base-300 to-base-100 py-12 sm:py-16 px-4 sm:px-6 text-center">
        <span className="badge badge-secondary badge-lg rounded-full px-4 py-3 mb-4">Our Services</span>
        <h1 className="section-title text-3xl sm:text-4xl md:text-5xl">What We Do</h1>
        <p className="section-subtitle max-w-xl mx-auto">
          6 specialised treatment categories — all under one roof in Melbourne.
        </p>
      </section>

      {/* Filter Tabs — horizontally scrollable on mobile */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`btn btn-sm rounded-full whitespace-nowrap shrink-0 transition-all ${
                active === cat ? 'btn-primary' : 'btn-outline btn-primary'
              }`}
            >
              {cat !== 'All' && <span className="mr-1">{categoryIcons[cat]}</span>}
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Service Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        {active === 'All' ? (
          categories.slice(1).map(cat => (
            <div key={cat} className="mb-10 sm:mb-12">
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <span className="text-xl sm:text-2xl">{categoryIcons[cat]}</span>
                <h2 className="font-serif text-xl sm:text-2xl font-semibold text-primary">{cat}</h2>
                <div className="flex-1 h-px bg-secondary/30 hidden sm:block" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {services.filter(s => s.category === cat).map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {filtered.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-secondary py-10 sm:py-12 px-4 sm:px-6 text-center">
        <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
          10% OFF Your First Visit!
        </h2>
        <p className="text-white/80 mb-5 sm:mb-6 text-sm sm:text-base">
          Book any service today and enjoy your first-visit discount.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/booking" className="btn btn-lg bg-white text-primary rounded-full px-10 border-0 w-full sm:w-auto">
            Book Now
          </Link>
          <a href="tel:04XXXXXXXX" className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary rounded-full px-8 w-full sm:w-auto">
            📞 Call Us
          </a>
        </div>
      </section>
    </>
  )
}

function ServiceCard({ service }) {
  return (
    <div className="card bg-base-100 border border-secondary/20 shadow-sm card-hover">
      <div className="card-body gap-3 p-4 sm:p-5">
        <div className="flex items-start justify-between">
          <div className="text-2xl sm:text-3xl">{service.icon}</div>
          <span className="badge badge-outline badge-secondary text-xs shrink-0 ml-2">{service.category}</span>
        </div>
        <h3 className="font-serif font-semibold text-sm sm:text-base text-primary leading-snug">{service.name}</h3>
        <p className="text-xs sm:text-sm text-base-content/60 leading-relaxed flex-1">{service.desc}</p>
        <div className="pt-3 border-t border-base-200">
          <Link to="/booking" className="btn btn-sm btn-primary rounded-full w-full">
            Book This
          </Link>
        </div>
      </div>
    </div>
  )
}
