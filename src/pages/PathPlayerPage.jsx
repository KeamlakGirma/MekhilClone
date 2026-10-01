import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import courses from '../data/courses.json'

export default function PathPlayerPage() {
  const [params] = useSearchParams()
  const courseId = params.get('course') || 'finding-x-in-marketing'
  const course = courses.find(c => c.id === courseId) || courses[0]

  const [openSection, setOpenSection] = useState(0)
  const [activeLesson, setActiveLesson] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const sections = course.sections || [{ title: '1. Introduction', lessons: [{ title: 'Introduction 1', duration: '05:30', type: 'video' }] }]
  const allLessons = sections.flatMap(s => s.lessons)
  const lesson = allLessons[activeLesson]

  const handlePlay = () => {
    setPlaying(p => !p)
    if (!playing) {
      const iv = setInterval(() => {
        setProgress(p => {
          if (p >= 100) { clearInterval(iv); setPlaying(false); return 100 }
          return p + 2
        })
      }, 200)
    }
  }

  return (
    <div className="flex h-[calc(100vh-80px)]">
      {/* SIDEBAR */}
      <aside className="w-[360px] bg-white border-r flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <Link to={`/course/${course.slug}`} className="text-xs text-navy">← Back to course page</Link>
          <button className="text-navy">«</button>
        </div>

        <div className="p-5 border-b">
          <h3 className="text-navy font-semibold mb-2">{course.title}</h3>
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-1">
            <div className="h-full bg-cyan" style={{ width: `${course.progress}%` }} />
          </div>
          <div className="text-xs text-navy text-right">{course.progress}%</div>
        </div>

        <div className="flex border-b text-xs">
          <button className="flex-1 py-3 text-navy font-semibold border-b-2 border-navy">Path</button>
          <button className="flex-1 py-3 text-gray-500">Learners</button>
          <button className="flex-1 py-3 text-gray-500">Discuss</button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {sections.map((sec, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenSection(openSection === i ? -1 : i)}
                className={`w-full text-left px-5 py-3 text-sm font-medium flex items-center justify-between ${openSection === i ? 'bg-cyan text-white' : 'text-navy hover:bg-gray-50'}`}
              >
                <span>{sec.title}</span>
                <span>{openSection === i ? '⌃' : '⌄'}</span>
              </button>
              {openSection === i && sec.lessons.map((l, j) => {
                const idx = sections.slice(0, i).reduce((a, s) => a + s.lessons.length, 0) + j
                return (
                  <button
                    key={j}
                    onClick={() => { setActiveLesson(idx); setProgress(0); setPlaying(false) }}
                    className={`w-full text-left px-8 py-2 text-xs flex items-center justify-between ${activeLesson === idx ? 'bg-gray-100 text-navy font-semibold' : 'text-gray-600'}`}
                  >
                    <span className="flex items-center gap-2">
                      <span>▶</span>{l.title}
                    </span>
                    <span>{l.duration}</span>
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 bg-black flex flex-col">
        <div className="flex justify-between text-white text-sm p-3">
          <button className="opacity-60">‹ previous</button>
          <button className="opacity-60">next ›</button>
        </div>

        <div className="flex-1 flex items-center justify-center relative">
          <button
            onClick={handlePlay}
            className="w-16 h-16 rounded-full bg-cyan flex items-center justify-center text-white text-2xl"
          >
            {playing ? '❚❚' : '▶'}
          </button>
          <div className="absolute bottom-8 text-white text-sm opacity-80">
            <div className="flex items-center gap-2">
              <img src={`https://i.pravatar.cc/30?u=johnny`} className="w-6 h-6 rounded-full" />
              johnnygirma00@gmail.com
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-3 flex items-center gap-3 text-white text-xs">
          <button onClick={handlePlay}>{playing ? '❚❚' : '▶'}</button>
          <div className="flex-1 h-1 bg-gray-700 rounded-full">
            <div className="h-full bg-cyan rounded-full" style={{ width: `${progress}%` }} />
          </div>
          <span>00:00 / {lesson?.duration || '05:30'}</span>
          <span>⚙</span><span>🔊</span><span>⛶</span>
        </div>
      </div>
    </div>
  )
}