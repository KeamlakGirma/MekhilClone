import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import courses from '../data/courses.json'
import testimonials from '../data/testimonials.json'
import partners from '../data/partners.json'
import CourseCard from '../components/ui/CourseCard.jsx'
import WaveDivider from '../components/layout/WaveDivider.jsx'
import { useState } from 'react'

export default function HomePage() {
  const { isAuthed } = useAuth()
  const popular = courses.filter((c) => c.popular).slice(0, 3)

  return (
    <div>
      {/* HERO */}
      <section className="relative">
        <div className="bg-gradient-to-b from-cyan/30 to-cyan/10 h-[320px] flex items-center justify-center px-6">
          <div className="text-center max-w-3xl">
            <h1 className="text-white text-2xl md:text-4xl font-semibold leading-tight drop-shadow-md">
              A simpler, practical approach to make your success in<br/>
              business and in life a reality awaits!
            </h1>
            <p className="text-white/95 text-sm mt-4">
              Join Ethiopia's Life transforming &amp; most convenient learning platform!
            </p>
          </div>
        </div>
        <WaveDivider color="#3FBBD9" flip />
      </section>

      {/* LEVELING UP YOUR LIFE */}
      <section className="max-w-[1200px] mx-auto px-8 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-6">Leveling up Your life</h2>
          <div className="text-navy text-sm space-y-3 leading-relaxed">
            <p>Are you living your best life?</p>
            <p>Deep down, you know there's more to you than your current circumstances.</p>
            <p>Now is the time to give your life, business, or career your best effort by equipping yourself with the right mindset and tools.</p>
            <p>We made empowerment simplified and achievable, it doesn't get any easier than this!</p>
            <p>Are you ready to empower You?</p>
          </div>
          <Link to="/courses" className="btn-navy inline-flex items-center gap-2 mt-6">
            Explore Courses
            <span className="text-lg">📖</span>
          </Link>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-navy translate-x-3 translate-y-3 rounded-sm" />
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&h=500&fit=crop"
            alt="Leveling up"
            className="relative w-full h-[380px] object-cover rounded-sm"
          />
        </div>
      </section>

      {/* WAVES */}
      <WaveDivider variant="wave-double" color="#3FBBD9" />

      {/* POPULAR COURSES */}
      <section className="py-12">
        <div className="max-w-[1100px] mx-auto px-8">
          <h2 className="text-2xl font-semibold mb-8">Popular courses</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {popular.map((c) => (
              <CourseCard key={c.id} course={c} showProgress={c.enrolled && isAuthed} />
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Link to="/courses" className="btn-navy inline-flex items-center gap-2">
              Explore Courses
              <span>📖</span>
            </Link>
          </div>
        </div>
      </section>

      {/* WAVES */}
      <WaveDivider variant="wave-double" color="#3FBBD9" />

      {/* WHY JOIN */}
      <section className="py-16 text-center">
        <div className="max-w-2xl mx-auto px-8">
          <h2 className="text-3xl font-semibold mb-6">Why join Mekhil?</h2>
          <p className="text-navy text-sm leading-relaxed">
            As a result of taking our uniquely tailored Training journeys, our students transform
            their life &amp; business by empowering themselves &amp; the people around them.<br/>
            Would you or anyone you know is ready to become their best version?<br/>
            <a className="underline font-medium" href="#">Here is Why Mekhil is your best Transformational Partner</a>
          </p>
          <div className="text-navy text-3xl mt-8">↓</div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-12 bg-white">
        <div className="max-w-[1000px] mx-auto px-8">
          <div className="grid grid-cols-3 gap-12 items-center justify-items-center">
            {partners.map((p) => (
              <img key={p.name} src={p.logo} alt={p.name} className="max-h-20 object-contain" />
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-8">
            <span className="w-6 h-1 bg-cyan rounded" />
            <span className="w-6 h-1 bg-gray-300 rounded" />
            <span className="w-6 h-1 bg-gray-300 rounded" />
          </div>
        </div>
      </section>

      <WaveDivider color="#3FBBD9" flip />

      {/* TESTIMONIALS */}
      <section className="bg-navy py-16">
        <div className="max-w-[900px] mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-5">
            {testimonials.slice(0, 2).map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
          <div className="max-w-[440px] mt-5">
            <TestimonialCard t={testimonials[2]} />
          </div>
        </div>
      </section>

      <WaveDivider color="#3FBBD9" />

      {/* NEWSLETTER */}
      <section className="bg-cyan py-16">
        <div className="max-w-2xl mx-auto px-8 text-center">
          <p className="text-white font-medium mb-6">
            Mekhil will send you bi-monthly emails, with tips and articles to<br/>
            simplify your personal and business Growth!
          </p>
          <div className="flex bg-white rounded-md overflow-hidden max-w-md mx-auto">
            <input
              type="email"
              placeholder="E-mail address"
              className="flex-1 px-4 py-3 text-sm outline-none"
            />
            <button className="bg-navy text-white px-6 text-sm font-medium flex items-center gap-2">
              Subscribe now
              <span>✉</span>
            </button>
          </div>
        </div>
      </section>

      <WaveDivider color="#3FBBD9" flip />
    </div>
  )
}

function TestimonialCard({ t }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white rounded-lg p-5 shadow-card">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span className="font-semibold text-navy text-sm">{t.name}</span>
          <span className="text-xs text-cyan">🔒</span>
        </div>
        <span className="text-navy">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <p className="text-xs text-gray-600 leading-relaxed mt-3">{t.text}</p>
      )}
    </div>
  )
}