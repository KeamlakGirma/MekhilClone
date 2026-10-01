import { useState } from 'react'
import WaveDivider from '../components/layout/WaveDivider.jsx'

const TABS = ['Request Corporate Training', 'Partner with us!', 'Become a trainer', 'Jobs!']

export default function OpportunitiesPage() {
  const [tab, setTab] = useState(0)
  return (
    <div>
      <section className="bg-white pt-12 pb-4">
        <h1 className="text-4xl font-bold text-navy text-center mb-8">Collaborations</h1>
        <div className="max-w-[700px] mx-auto px-8">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=700&h=350&fit=crop"
            className="w-full h-[300px] object-cover rounded"
          />
        </div>
      </section>

      <WaveDivider color="#3FBBD9" flip />

      <section className="max-w-[800px] mx-auto px-8 pb-16">
        <div className="grid grid-cols-4 gap-2 mb-6">
          {TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={`text-xs py-2 rounded ${tab === i ? 'bg-navy text-white' : 'bg-gray-100 text-navy'}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="bg-white shadow-card rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-cyan/20 p-8 flex justify-between items-center">
            <div className="text-navy font-bold text-2xl">CONTACT US</div>
            <div className="text-4xl">📧</div>
          </div>
          <div className="p-8 text-sm text-gray-700 space-y-4">
            <h3 className="font-semibold text-navy text-center">Transform Your Team, Strengthen Your Business</h3>
            <p>At Mekhil Empowerment &amp; Training Center, we partner with organizations to unlock the full potential of their people. From team enhancement programs and retreat trainings to management-level coaching, we design solutions that deliver measurable impact.</p>
            <p>Whether through in-person group training, team retreats, or individual and group coaching for leaders, our programs equip teams to perform at their best and drive sustainable growth.</p>
            <h4 className="font-semibold text-navy text-center">Unlock Leadership Potential with Coaching</h4>
            <p>Effective leadership is the cornerstone of business success. Our certified coaches, with expertise in business and specialized fields, provide practical tools and strategies to help leaders make confident decisions, inspire teams, and navigate challenges with clarity.</p>
            <p>Invest in your people—because strong teams and strong leaders build stronger organizations.</p>
          </div>
        </div>
      </section>
    </div>
  )
}