import { useState } from 'react'
import emailjs from '@emailjs/browser'

// ─── EmailJS config (set these in your .env file) ──────────────────────────
const EMAILJS_PUBLIC_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const EMAILJS_SERVICE_ID      = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_OWNER_TEMPLATE  = import.meta.env.VITE_EMAILJS_OWNER_TEMPLATE_ID
const EMAILJS_CUSTOMER_TEMPLATE = import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID

const serviceOptions = [
  { group: 'Permanent Makeup', items: [
    'Lip Blush Tattoo', 'Nano Brows / Strokes', 'Ombré Brows',
    'Combo Brows', 'Eye Liner', 'BB Glow',
    'Camouflage Tattoo (Scars / Stretch Marks)',
  ]},
  { group: 'Cosmetic Makeup', items: [
    'Bridal Makeup', 'Night Out / Party Makeup', 'Party Makeup',
    'Hair Style, Buns & Curls with Extensions', 'Nano Plasty Hair Keratin',
  ]},
  { group: 'Eye Lash Extensions', items: [
    'Classic Eye Lash Extensions', 'Volume Eye Lash Extensions',
    'Hybrid Eye Lash Extensions', 'Korean Eye Lash Lift',
  ]},
  { group: 'Brows', items: [
    'Eye Brow Lamination & Henna Brows', 'Tint Brows',
    'Eye Brow Wax', 'Eye Brow Shaping / Correction',
  ]},
  { group: 'Facials', items: [
    'Microdermabrasion', 'Aquaglow Hydra Dermabrasion',
    'Skin Needling', 'Hydra Facial',
  ]},
  { group: 'Laser Treatment', items: [
    'Laser Hair Removal', 'LED Therapy', 'Carbon Facial',
    'Skin Tightening Treatment', 'Exosomes Micro Needling',
    'Anti-Wrinkle Skin Treatment', 'Tattoo Removal', 'Skin Rejuvenation',
    'Pigment & Hyper Pigmentation Removal', 'Vascular Removal',
  ]},
]

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM',
]

const initialForm = {
  name: '', phone: '', email: '', service: '', date: '', time: '', notes: '',
}

export default function Booking() {
  const [form, setForm]           = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [sendError, setSendError] = useState('')
  const [errors, setErrors]       = useState({})

  const today = new Date().toISOString().split('T')[0]

  function validate() {
    const e = {}
    if (!form.name.trim())  e.name    = 'Name is required'
    if (!form.phone.trim()) e.phone   = 'Phone number is required'
    else if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Enter a valid 10-digit number'
    if (!form.email.trim()) e.email   = 'Email is required to send confirmation'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address'
    if (!form.service)      e.service = 'Please select a service'
    if (!form.date)         e.date    = 'Please choose a date'
    if (!form.time)         e.time    = 'Please choose a time slot'
    return e
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    if (sendError)    setSendError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }

    setLoading(true)
    setSendError('')

    // Shared template variables
    const templateParams = {
      customer_name:    form.name,
      customer_phone:   form.phone,
      customer_email:   form.email,
      service:          form.service,
      date:             form.date,
      time:             form.time,
      notes:            form.notes || 'None',
      clinic_name:      'A Bold Beauty Cosmetic Clinic',
      clinic_phone:     '04XX XXX XXX',
      clinic_email:     'hello@aboldbeauty.com.au',
      clinic_location:  'Melbourne, VIC',
    }

    try {
      // 1. Notify the owner
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_OWNER_TEMPLATE,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )

      // 2. Send confirmation to the customer
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_CUSTOMER_TEMPLATE,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )

      setSubmitted(true)
    } catch (err) {
      console.error('EmailJS error:', err)
      setSendError('Could not send the confirmation email. Please try again or call us directly.')
    } finally {
      setLoading(false)
    }
  }

  // ─── Success screen ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center px-4 py-16 sm:py-20">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl sm:text-7xl mb-5 animate-bounce">🎉</div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary mb-3">
            Appointment Confirmed!
          </h2>
          <p className="text-base-content/70 mb-2 text-base sm:text-lg">
            Hi <strong>{form.name}</strong>, we can't wait to see you!
          </p>

          <div className="card bg-base-200 border border-secondary/20 my-5 text-left">
            <div className="card-body gap-3 p-4 sm:p-6">
              {[
                ['Service', form.service],
                ['Date',    form.date],
                ['Time',    form.time],
                ['Phone',   form.phone],
                ['Email',   form.email],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between gap-4 text-sm">
                  <span className="text-base-content/50 font-medium shrink-0">{label}</span>
                  <span className="font-semibold text-base-content text-right break-all">{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="alert bg-accent border-secondary/30 text-sm mb-5 text-left">
            <span>📧</span>
            <span>A confirmation email has been sent to <strong>{form.email}</strong>.</span>
          </div>

          <div className="badge badge-primary badge-lg mb-5 py-3 px-5">🎁 10% OFF — First Visit Applied!</div>

          <button
            className="btn btn-primary btn-lg rounded-full px-10 w-full sm:w-auto"
            onClick={() => { setForm(initialForm); setSubmitted(false) }}
          >
            Book Another
          </button>
        </div>
      </section>
    )
  }

  // ─── Booking form ──────────────────────────────────────────────────────────
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-base-300 to-base-100 py-12 sm:py-16 px-4 sm:px-6 text-center">
        <span className="badge badge-secondary badge-lg rounded-full px-4 py-3 mb-4">Appointments</span>
        <h1 className="section-title text-3xl sm:text-4xl md:text-5xl">Book Your Session</h1>
        <p className="section-subtitle max-w-xl mx-auto">
          Reserve your spot at A Bold Beauty — Melbourne's trusted beauty destination.
        </p>
        <div className="badge badge-primary badge-lg py-3 px-5 mt-2">🎁 10% OFF on your First Visit!</div>
      </section>

      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-12"
        style={{ paddingBottom: 'max(3rem, env(safe-area-inset-bottom))' }}
      >
        <div className="card bg-base-100 border border-secondary/20 shadow-md">
          <div className="card-body gap-5 p-5 sm:p-8">

            {/* Email send error alert */}
            {sendError && (
              <div className="alert alert-error text-sm">
                <span>⚠️ {sendError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5" noValidate>

              {/* Name */}
              <div className="form-control gap-1">
                <label className="label py-1">
                  <span className="label-text font-medium">Full Name <span className="text-error">*</span></span>
                </label>
                <input
                  type="text" name="name" placeholder="Your full name"
                  value={form.name} onChange={handleChange}
                  className={`input input-bordered w-full rounded-xl ${errors.name ? 'input-error' : ''}`}
                />
                {errors.name && <span className="text-error text-xs">{errors.name}</span>}
              </div>

              {/* Phone */}
              <div className="form-control gap-1">
                <label className="label py-1">
                  <span className="label-text font-medium">Phone Number <span className="text-error">*</span></span>
                </label>
                <input
                  type="tel" name="phone" placeholder="04XX XXX XXX"
                  value={form.phone} onChange={handleChange} maxLength={10}
                  inputMode="numeric"
                  className={`input input-bordered w-full rounded-xl ${errors.phone ? 'input-error' : ''}`}
                />
                {errors.phone && <span className="text-error text-xs">{errors.phone}</span>}
              </div>

              {/* Email — required now */}
              <div className="form-control gap-1">
                <label className="label py-1">
                  <span className="label-text font-medium">
                    Email <span className="text-error">*</span>
                    <span className="text-base-content/40 text-xs font-normal ml-1">(confirmation sent here)</span>
                  </span>
                </label>
                <input
                  type="email" name="email" placeholder="your@email.com"
                  value={form.email} onChange={handleChange}
                  className={`input input-bordered w-full rounded-xl ${errors.email ? 'input-error' : ''}`}
                />
                {errors.email && <span className="text-error text-xs">{errors.email}</span>}
              </div>

              {/* Service */}
              <div className="form-control gap-1">
                <label className="label py-1">
                  <span className="label-text font-medium">Service <span className="text-error">*</span></span>
                </label>
                <select
                  name="service" value={form.service} onChange={handleChange}
                  className={`select select-bordered w-full rounded-xl ${errors.service ? 'select-error' : ''}`}
                >
                  <option value="">Select a service...</option>
                  {serviceOptions.map(({ group, items }) => (
                    <optgroup key={group} label={group}>
                      {items.map(item => <option key={item} value={item}>{item}</option>)}
                    </optgroup>
                  ))}
                </select>
                {errors.service && <span className="text-error text-xs">{errors.service}</span>}
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-control gap-1">
                  <label className="label py-1">
                    <span className="label-text font-medium">Date <span className="text-error">*</span></span>
                  </label>
                  <input
                    type="date" name="date" value={form.date} min={today}
                    onChange={handleChange}
                    className={`input input-bordered w-full rounded-xl ${errors.date ? 'input-error' : ''}`}
                  />
                  {errors.date && <span className="text-error text-xs">{errors.date}</span>}
                </div>
                <div className="form-control gap-1">
                  <label className="label py-1">
                    <span className="label-text font-medium">Time <span className="text-error">*</span></span>
                  </label>
                  <select
                    name="time" value={form.time} onChange={handleChange}
                    className={`select select-bordered w-full rounded-xl ${errors.time ? 'select-error' : ''}`}
                  >
                    <option value="">Choose slot...</option>
                    {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.time && <span className="text-error text-xs">{errors.time}</span>}
                </div>
              </div>

              {/* Notes */}
              <div className="form-control gap-1">
                <label className="label py-1">
                  <span className="label-text font-medium">
                    Notes <span className="text-base-content/40 text-xs font-normal">(optional)</span>
                  </span>
                </label>
                <textarea
                  name="notes" value={form.notes} onChange={handleChange}
                  placeholder="Any allergies, skin concerns, or special requests..."
                  rows={3}
                  className="textarea textarea-bordered w-full rounded-xl resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-lg rounded-full w-full mt-1 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Sending...
                  </>
                ) : (
                  'Confirm Appointment ✨'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 sm:mt-8">
          {[
            { icon: '📍', title: 'Location',  text: 'Melbourne, VIC',           href: null },
            { icon: '📞', title: 'Call Us',   text: '04XX XXX XXX',             href: 'tel:04XXXXXXXX' },
            { icon: '✉️', title: 'Email',     text: 'hello@aboldbeauty.com.au', href: 'mailto:hello@aboldbeauty.com.au' },
            { icon: '📸', title: 'Instagram', text: '@aboldbeauty.au',          href: 'https://instagram.com/aboldbeauty.au' },
          ].map(({ icon, title, text, href }) => {
            const inner = (
              <div className="card-body py-3 px-2 sm:px-3 gap-1 items-center text-center">
                <div className="text-xl sm:text-2xl">{icon}</div>
                <p className="font-semibold text-xs sm:text-sm text-primary">{title}</p>
                <p className="text-[10px] sm:text-xs text-base-content/60 break-all leading-tight">{text}</p>
              </div>
            )
            return (
              <div key={title} className="card bg-base-200 border border-secondary/20">
                {href
                  ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined}
                       rel="noopener noreferrer"
                       className="block hover:bg-base-300 transition-colors rounded-2xl">{inner}</a>
                  : inner
                }
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
