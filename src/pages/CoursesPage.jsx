import { useState } from 'react'
import coursesData from '../data/courses.json'
import CourseCard from '../components/ui/CourseCard.jsx'
import WaveDivider from '../components/layout/WaveDivider.jsx'
import { useAuth } from '../context/AuthContext.jsx'

import BundleCard from '../components/ui/BundleCard.jsx'
import { getBundles } from '../data/store.js'
import { useStoreValue } from '../components/admin/useStore.js'

const FILTERS = ['All', 'My', 'Not Registered', 'Newest', 'Popular', 'Free', 'Categories']

export default function CoursesPage() {
  const { isAuthed } = useAuth()
  const [filter, setFilter] = useState('All')
  const [q, setQ] = useState('')

  const [bundles] = useStoreValue(getBundles)
  const activeBundles = bundles.filter(b => b.active)

  let list = [...coursesData]
  if (filter === 'My') list = list.filter(c => c.enrolled)
  if (filter === 'Not Registered') list = list.filter(c => !c.enrolled)
  if (filter === 'Newest') list = list.filter(c => c.newest)
  if (filter === 'Popular') list = list.filter(c => c.popular)
  if (filter === 'Free') list = list.filter(c => c.free)
  if (q) list = list.filter(c => c.title.toLowerCase().includes(q.toLowerCase()))

  return (
    <div>
      <section className="bg-white pt-10 pb-6 relative">
        <div className="max-w-[1200px] mx-auto px-8">
          <h1 className="text-4xl font-semibold mb-8">Courses</h1>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex gap-1 flex-wrap">
              {FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 text-sm ${filter === f ? 'text-navy font-semibold border-b-2 border-navy' : 'text-gray-500 hover:text-navy'}`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search for courses"
                className="bg-cyan/70 placeholder-white/80 text-white text-sm rounded-full px-5 py-2.5 pr-10 w-[280px] outline-none"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white">🔍</span>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider color="#3FBBD9" flip className="-mt-1" />

     <section className="max-w-[1200px] mx-auto px-8 py-12">
        {activeBundles.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-navy mb-6">📦 Bundles</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-14">
              {activeBundles.map(b => <BundleCard key={b.id} bundle={b} />)}
            </div>
            <h2 className="text-2xl font-semibold text-navy mb-6">All Courses</h2>
          </div>
        )}

        {list.length === 0 ? (
          <p className="text-center text-gray-500 py-20">No courses found.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {list.map(c => <CourseCard key={c.id} course={c} showProgress={c.enrolled && isAuthed} />)}
          </div>
        )}
      </section>
    </div>
  )
}