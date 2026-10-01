import { useState } from 'react'

export default function Accordion({ items, defaultOpen = 0, variant = 'cyan' }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="space-y-2">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={i} className="border-b border-gray-200 pb-2">
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="w-full flex items-center justify-between text-left py-3"
            >
              <span className="text-navy font-semibold">{item.title}</span>
              <span className="text-navy text-xl">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && <div className="pb-3">{item.content}</div>}
          </div>
        )
      })}
    </div>
  )
}