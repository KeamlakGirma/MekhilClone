import { useSearchParams, Link } from 'react-router-dom'
import { useState } from 'react'
import courses from '../data/courses.json'

export default function PaymentPage() {
  const [params] = useSearchParams()
  const productId = params.get('product_id') || 'negotiation'
  const course = courses.find(c => c.id === productId) || courses[1]
  const [coupon, setCoupon] = useState('')
  const [paid, setPaid] = useState(false)

  const fmt = (n) => new Intl.NumberFormat('en-US').format(n)

  if (paid) {
    return (
      <div className="max-w-[700px] mx-auto px-8 py-20 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-semibold text-navy mb-3">Payment successful!</h1>
        <p className="text-gray-600 mb-6">You now have access to {course.title}.</p>
        <Link to={`/path-player?course=${course.id}`} className="btn-navy">Start learning</Link>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-[900px] mx-auto px-6">
        <div className="bg-navy text-white rounded-lg p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6">Order Details</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <img src={course.thumbnail} className="w-full h-[220px] object-cover rounded" />
            <div>
              <p className="text-xs uppercase tracking-widest opacity-70 mb-2">Course</p>
              <h3 className="text-lg font-semibold mb-3">{course.title}</h3>
              <p className="text-sm opacity-90 leading-relaxed mb-4">{course.subtitle.slice(0, 300)}...</p>
              <p className="text-xs opacity-70 mb-1">Access for 1 year</p>
              <p className="text-xs opacity-70 mb-4 italic">special offer</p>
              <div className="flex justify-between items-baseline border-t border-white/20 pt-4">
                <span className="font-semibold">Price</span>
                <div className="text-right">
                  <div className="text-white/50 line-through text-sm">{course.currency}{fmt(course.priceOriginal)}</div>
                  <div className="text-lg font-bold">{course.currency}{fmt(course.price)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-8">
          <h3 className="text-lg font-semibold text-navy mb-4">Payment Method</h3>
          <label className="text-sm text-navy block mb-2">Have a coupon?</label>
          <div className="flex gap-2 mb-6">
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Claim your coupon"
              className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-sm outline-none"
            />
            <button className="btn-primary px-8">Redeem</button>
          </div>

          <div className="text-sm space-y-2 mb-6">
            <div className="flex justify-between"><span>Sub total</span><span>Br{fmt(course.price)}</span></div>
            <div className="flex justify-between"><span>Discounts</span><span>-Br0</span></div>
            <div className="flex justify-between font-semibold border-t pt-2"><span>Total:</span><span>Br{fmt(course.price)}</span></div>
          </div>

          <div className="flex flex-col items-start gap-3">
            <button className="btn-primary px-10">Sign Up</button>
            <button onClick={() => setPaid(true)} className="btn-primary px-10">Pay Now</button>
          </div>
        </div>

        <div className="text-xs text-gray-600 mt-6 flex items-start gap-2">
          <span>🛡</span>
          <div>
            <p className="font-semibold text-navy">GUARANTEED SECURITY USING ONE OF THE MOST ADVANCED ENCRYPTED SYSTEMS ON THE MARKET.</p>
            <p>The information in this page is being processed and encrypted securely using industry-leading encryption and fraud prevention tools.</p>
          </div>
        </div>
      </div>
    </div>
  )
}