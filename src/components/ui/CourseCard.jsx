import { Link } from 'react-router-dom'

export default function CourseCard({ course, showProgress = false }) {
  const fmt = (n) => new Intl.NumberFormat('en-US').format(n)

  return (
    <div className="card flex flex-col h-full">
      {/* Thumbnail with badge + ribbon */}
      <div className="relative">
        <div className="absolute top-3 left-3 z-10 bg-cyan text-white text-[10px] font-medium px-2 py-0.5 rounded">
          {course.badge || 'Access for 1 year'}
        </div>
        {course.ribbon && (
          <div className="absolute top-0 right-0 z-10">
            <div className="bg-navy text-white text-[10px] font-semibold px-6 py-1 rotate-45 translate-x-4 translate-y-3 shadow">
              {course.ribbon}
            </div>
          </div>
        )}
        <img src={course.thumbnail} alt={course.title} className="w-full h-[200px] object-cover" />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-navy text-center font-semibold text-lg leading-snug mb-3">
          {course.title}
        </h3>
        <p className="text-gray-600 text-xs leading-relaxed text-center line-clamp-5 mb-4 flex-1">
          {course.subtitle}
        </p>

        <div className="flex items-center justify-center gap-3 mb-4">
          <img src={course.instructor.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
          <span className="text-navy text-xs font-medium">{course.instructor.name}</span>
        </div>

        {showProgress ? (
          <>
            <div className="text-center text-[11px] text-navy font-semibold mb-2">
              {course.progress}% COMPLETE
            </div>
            <div className="w-full h-1 bg-gray-200 rounded-full mb-4 overflow-hidden">
              <div className="h-full bg-cyan" style={{ width: `${course.progress}%` }} />
            </div>
            <Link to={`/path-player?course=${course.id}`} className="btn-navy text-center text-sm">
              Continue
            </Link>
          </>
        ) : (
          <>
            <div className="text-center mb-4">
              {course.priceOriginal && (
                <span className="text-gray-400 line-through text-xs mr-2">
                  {course.currency}{fmt(course.priceOriginal)}
                </span>
              )}
              <span className="text-navy font-bold">
                {course.currency}{fmt(course.price)}
              </span>
            </div>
            <Link to={`/course/${course.slug}`} className="btn-navy text-center text-sm">
              Explore
            </Link>
          </>
        )}
      </div>
    </div>
  )
}