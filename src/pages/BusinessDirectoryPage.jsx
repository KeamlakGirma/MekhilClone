import { useState } from 'react'
import data from '../data/businessDirectory.json'
import WaveDivider from '../components/layout/WaveDivider.jsx'

export default function BusinessDirectoryPage() {
  const [active, setActive] = useState(data.categories[0])
  const [open, setOpen] = useState(null)

  const listings = data.listings.filter(l => l.category === active)

  return (
    <div>
      <WaveDivider color="#3FBBD9" flip />
      <section className="max-w-[1200px] mx-auto px-8 pb-16">
        <h1 className="text-4xl font-bold text-navy text-center mb-12">Business Directory</h1>

        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2 mb-12 max-w-[900px] mx-auto">
          {data.categories.map(c => (
            <button
              key={c}
              onClick={() => { setActive(c); setOpen(null) }}
              className={`text-xs p-3 rounded text-left leading-tight transition-colors ${
                active === c ? 'bg-cyan text-white' : 'bg-gray-50 text-navy hover:bg-gray-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="max-w-[800px] mx-auto">
          {listings.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No listings in this category yet.</p>
          ) : (
            listings.map((l, i) => (
              <div key={i} className="mb-4">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex items-center gap-3 w-full text-left"
                >
                  <span className="text-navy text-2xl">−</span>
                  <span className="text-cyan font-bold text-lg">{l.name}</span>
                </button>
                {open === i && (
                  <div className="pl-8 mt-3 text-sm text-navy space-y-1">
                    <p><span className="font-semibold">Telephone:</span> {l.telephone}</p>
                    <p><span className="font-semibold">Website:</span> <a className="text-cyan underline" href={l.website}>{l.website}</a></p>
                    <p><span className="font-semibold">Email:</span> {l.email}</p>
                    <p><span className="font-semibold">Service Provided:</span> {l.service}</p>
                    <p><span className="font-semibold">Contact Person:</span> {l.contact}</p>
                    <p><span className="font-semibold">Location:</span> {l.location}</p>
                    <button className="mt-3 text-cyan text-xs border border-cyan rounded-full px-3 py-1">
                      Google Maps 📍
                    </button>
                    <div className="mt-4">
                      <img src={l.logo} className="w-32 h-32 object-contain" />
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}