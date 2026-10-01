import { useParams, Link } from 'react-router-dom'
import courses from '../data/courses.json'
import WaveDivider from '../components/layout/WaveDivider.jsx'

export default function CourseSalesPage() {
  const { slug } = useParams()
  const course = courses.find(c => c.slug === slug) || courses[0]

  return (
    <div>
      {/* Cyan banner */}
      <div className="bg-cyan text-white text-center py-4 text-lg font-medium">
        {course.title}
      </div>

      <section className="max-w-[1000px] mx-auto px-8 py-16">
        <div className="text-center mb-8">
          <img src={course.thumbnail} alt={course.title} className="max-w-[500px] mx-auto rounded" />
        </div>
        <div className="text-center mb-12">
          <Link to={`/payment?product_id=${course.id}`} className="btn-primary">
            Register now Br{course.price.toLocaleString()}
          </Link>
        </div>

        <div className="relative">
          {/* Decorative dot grids */}
          <div className="hidden md:block absolute -left-12 top-0 w-32 h-32 opacity-40"
               style={{ backgroundImage: 'radial-gradient(#999 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }} />
          <div className="hidden md:block absolute -right-12 top-40 w-32 h-32 opacity-40"
               style={{ backgroundImage: 'radial-gradient(#999 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }} />

          <h2 className="text-3xl font-semibold mb-6">{course.title}</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="grid grid-cols-2 gap-3">
              <img src={course.heroImages?.[0]} className="rounded object-cover h-40 w-full" />
              <img src={course.heroImages?.[1]} className="rounded object-cover h-40 w-full" />
              <img src={course.heroImages?.[2]} className="rounded object-cover h-40 w-full col-span-2" />
            </div>
            <div>
              <p className="text-navy text-sm leading-relaxed">{course.subtitle}</p>
            </div>
          </div>

          {course.vitalFor && (
            <div className="bg-cyan rounded-md p-6 mb-8">
              <div className="bg-navy text-white px-4 py-2 -mx-6 -mt-6 mb-4 text-sm font-semibold">
                — Negotiation and Skill Management class are vital for
              </div>
              <div className="text-navy text-xs">
                <p className="font-semibold mb-1">Corporate/Business:</p>
                <ul className="list-disc pl-5 mb-3 space-y-0.5">
                  {course.vitalFor.corporate.map((x, i) => <li key={i}>{x}</li>)}
                </ul>
                <p className="font-semibold mb-1">Individuals:</p>
                <ul className="list-disc pl-5 space-y-0.5">
                  {course.vitalFor.individual.map((x, i) => <li key={i}>{x}</li>)}
                </ul>
              </div>
            </div>
          )}

          {course.forWhom && (
            <>
              <h3 className="text-xl font-semibold bg-gray-100 px-3 py-2 mb-3">For Whom it is</h3>
              <ul className="list-disc pl-5 text-navy text-sm space-y-1 mb-8">
                {course.forWhom.map((x, i) => <li key={i}>{x}</li>)}
              </ul>
            </>
          )}

          <h3 className="text-xl font-semibold bg-navy text-white px-3 py-2 mb-3">What it contains</h3>
        </div>
      </section>

      {/* Instructor */}
      {course.instructorBio && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-[1000px] mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-cyan text-xs font-bold tracking-widest mb-2">MEET THE INSTRUCTOR</p>
              <h3 className="text-2xl font-bold text-navy mb-4">{course.instructor.name}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{course.instructorBio}</p>
            </div>
            <img src={course.instructorPhoto} className="rounded object-cover w-full h-[400px]" />
          </div>
        </section>
      )}
    </div>
  )
}