import courses from '../data/courses.json'
import CourseCard from '../components/ui/CourseCard.jsx'
import WaveDivider from '../components/layout/WaveDivider.jsx'
import { Link } from 'react-router-dom'

export default function MasterclassPage() {
  const list = courses.filter(c => c.isMasterclass)
  return (
    <div>
      <section className="py-12 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <h1 className="text-4xl font-semibold mb-8">Masterclass</h1>
        </div>
      </section>
      <WaveDivider color="#3FBBD9" flip />
      <section className="max-w-[1200px] mx-auto px-8 py-12">
        {list.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-navy text-lg mb-2">Masterclass courses require special access.</p>
            <p className="text-gray-500 text-sm">Contact us to be invited.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {list.map(c => <CourseCard key={c.id} course={c} />)}
          </div>
        )}
      </section>
    </div>
  )
}