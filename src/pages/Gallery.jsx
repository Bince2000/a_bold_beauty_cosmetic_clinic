import { useState, useEffect } from 'react'

const categories = ['All', 'Bridal', 'Hair', 'Makeup', 'Nails', 'Skin']

const galleryItems = [
  { id: 1,  category: 'Bridal', title: 'Bridal Bliss',       src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80' },
  { id: 2,  category: 'Hair',   title: 'Glossy Waves',       src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80' },
  { id: 3,  category: 'Makeup', title: 'Evening Glam',       src: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80' },
  { id: 4,  category: 'Nails',  title: 'Pastel Dreams',      src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80' },
  { id: 5,  category: 'Skin',   title: 'Radiant Glow',       src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80' },
  { id: 6,  category: 'Bridal', title: 'Golden Hour Bride',  src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80' },
  { id: 7,  category: 'Hair',   title: 'Silk Straight',      src: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600&q=80' },
  { id: 8,  category: 'Makeup', title: 'Bold & Beautiful',   src: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80' },
  { id: 9,  category: 'Nails',  title: 'Floral Nail Art',    src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80' },
  { id: 10, category: 'Skin',   title: 'Spa Day',            src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80' },
  { id: 11, category: 'Bridal', title: 'Bridal Mehendi',     src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80' },
  { id: 12, category: 'Hair',   title: 'Balayage Magic',     src: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80' },
]

export default function Gallery() {
  const [active, setActive]   = useState('All')
  const [lightbox, setLightbox] = useState(null)
  const [lightboxIdx, setLightboxIdx] = useState(0)

  const filtered = active === 'All' ? galleryItems : galleryItems.filter(g => g.category === active)

  function openLightbox(item) {
    const idx = filtered.findIndex(i => i.id === item.id)
    setLightboxIdx(idx)
    setLightbox(item)
  }

  function prev() {
    const newIdx = (lightboxIdx - 1 + filtered.length) % filtered.length
    setLightboxIdx(newIdx)
    setLightbox(filtered[newIdx])
  }

  function next() {
    const newIdx = (lightboxIdx + 1) % filtered.length
    setLightboxIdx(newIdx)
    setLightbox(filtered[newIdx])
  }

  // Close lightbox on Escape, navigate with arrow keys
  useEffect(() => {
    if (!lightbox) return
    function onKey(e) {
      if (e.key === 'Escape')      setLightbox(null)
      if (e.key === 'ArrowLeft')   prev()
      if (e.key === 'ArrowRight')  next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, lightboxIdx])

  // Lock scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-base-300 to-base-100 py-12 sm:py-16 px-4 sm:px-6 text-center">
        <span className="badge badge-secondary badge-lg rounded-full px-4 py-3 mb-4">Gallery</span>
        <h1 className="section-title text-3xl sm:text-4xl md:text-5xl">Our Work</h1>
        <p className="section-subtitle max-w-xl mx-auto">
          A showcase of the beautiful transformations we create every day.
        </p>
      </section>

      {/* Filter — scrollable on mobile */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center"
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
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
          {filtered.map(item => (
            <div
              key={item.id}
              className="break-inside-avoid group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-sm cursor-pointer border border-secondary/10 hover:shadow-lg transition-all duration-300"
              onClick={() => openLightbox(item)}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {/* Overlay — always visible on touch devices */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent
                opacity-0 group-hover:opacity-100 md:group-hover:opacity-100
                transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4"
              >
                <span className="badge badge-secondary badge-sm mb-1">{item.category}</span>
                <p className="text-white font-serif font-semibold text-sm sm:text-base">{item.title}</p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-base-content/50 py-16">No images in this category yet.</p>
        )}
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          style={{ padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)' }}
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative w-full max-w-3xl mx-4 bg-base-100 rounded-2xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative bg-black">
              <img
                src={lightbox.src}
                alt={lightbox.title}
                className="w-full object-contain max-h-[55vh] sm:max-h-[65vh]"
              />

              {/* Prev / Next */}
              {filtered.length > 1 && (
                <>
                  <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 btn btn-circle btn-sm bg-black/50 border-0 text-white hover:bg-black/80"
                    onClick={e => { e.stopPropagation(); prev() }}
                    aria-label="Previous"
                  >‹</button>
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-circle btn-sm bg-black/50 border-0 text-white hover:bg-black/80"
                    onClick={e => { e.stopPropagation(); next() }}
                    aria-label="Next"
                  >›</button>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 flex items-center justify-between">
              <div>
                <span className="badge badge-secondary mb-1">{lightbox.category}</span>
                <p className="font-serif font-semibold text-base sm:text-lg text-primary">{lightbox.title}</p>
                <p className="text-xs text-base-content/40">{lightboxIdx + 1} / {filtered.length}</p>
              </div>
              <button
                className="btn btn-circle btn-ghost text-lg"
                onClick={() => setLightbox(null)}
                aria-label="Close"
              >✕</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
