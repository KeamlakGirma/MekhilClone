import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import courses from '../data/courses.json'
import { getBundles, getCoupons, createPayment, createEnrollment, updateCoupon } from '../data/store.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function PaymentPage() {
  const [params] = useSearchParams()
  const productId = params.get('product_id') || 'negotiation'
  const type = params.get('type') || 'course'
  const navigate = useNavigate()
  const { user } = useAuth()

  const bundle = type === 'bundle' ? getBundles().find(b => b.id === productId) : null
  const course = !bundle ? (courses.find(c => c.id === productId) || courses[1]) : null

  const title = bundle ? bundle.name : course.title
  const description = bundle ? bundle.description : course.subtitle
  const price = bundle ? bundle.price : course.price
  const original = bundle ? bundle.originalPrice : course.priceOriginal
  const thumbnail = bundle
    ? (courses.find(c => c.id === bundle.courseIds[0])?.thumbnail)
    : course.thumbnail

  const [coupon, setCoupon] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [discount, setDiscount] = useState(0)
  const [paid, setPaid] = useState(false)

  const fmt = (n) => new Intl.NumberFormat('en-US').format(n)

  const applyCoupon = () => {
    const found = getCoupons().find(c => c.code === coupon.toUpperCase() && c.active)
    if (!found) return alert('Invalid coupon')
    if (found.appliesTo !== 'all' && found.appliesTo !== productId) return alert('Coupon does not apply to this item')
    const disc = found.discountType === 'percent'
      ? Math.round(price * found.amount / 100)
      : found.amount
    setDiscount(Math.min(disc, price))
    setAppliedCoupon(found)
  }

  const handlePay = () => {
    // Record payment
    createPayment({
      userId: user?.email || 'guest',
      userEmail: user?.email || 'guest@mekhil.com',
      userName: user?.name || 'Guest',
      itemId: productId,
      itemTitle: title,
      itemType: type,
      amount: price,
      discount,
      couponCode: appliedCoupon?.code || null,
    })

    // Create enrollments
    if (bundle) {
      bundle.courseIds.forEach(cid => {
        const c = courses.find(x => x.id === cid)
        if (c) createEnrollment({
          userId: user?.email || 'guest',
          userEmail: user?.email || 'guest@mekhil.com',
          userName: user?.name || 'Guest',
          courseId: c.id,
          courseTitle: c.title,
        })
      })
    } else {
      createEnrollment({
        userId: user?.email || 'guest',
        userEmail: user?.email || 'guest@mekhil.com',
        userName: user?.name || 'Guest',
        courseId: course.id,
        courseTitle: course.title,
      })
    }

    // Increment coupon usage
    if (appliedCoupon) {
      updateCoupon(appliedCoupon.id, { usageCount: appliedCoupon.usageCount + 1 })
    }

    setPaid(true)
  }

  const total = Math.max(0, price - discount)

  if (paid) {
    return (
      <div className="max-w-[700px] mx-auto px-8 py-20 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-semibold text-navy mb-3">Payment successful!</h1>
        <p className="text-gray-600 mb-6">You now have access to {title}.</p>
        <Link to="/courses" className="btn-navy">Go to my courses</Link>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-[900px] mx-auto px-6">
        <div className="bg-navy text-white rounded-lg p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6">Order Details</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <img src={thumbnail} className="w-full h-[220px] object-cover rounded" />
            <div>
              <p className="text-xs uppercase tracking-widest opacity-70 mb-2">{bundle ? 'Bundle' : 'Course'}</p>
              <h3 className="text-lg font-semibold mb-3">{title}</h3>
              <p className="text-sm opacity-90 leading-relaxed mb-4">{description.slice(0, 300)}...</p>
              <p className="text-xs opacity-70 mb-1">Access for 1 year</p>
              <p className="text-xs opacity-70 mb-4 italic">special offer</p>
              <div className="flex justify-between items-baseline border-t border-white/20 pt-4">
                <span className="font-semibold">Price</span>
                <div className="text-right">
                  <div className="text-white/50 line-through text-sm">Br{fmt(original)}</div>
                  <div className="text-lg font-bold">Br{fmt(price)}</div>
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
            <button onClick={applyCoupon} className="btn-primary px-8">Redeem</button>
          </div>

          {appliedCoupon && (
            <div className="text-xs text-emerald-600 mb-4">
              ✅ Coupon <span className="font-mono font-semibold">{appliedCoupon.code}</span> applied — you save Br{fmt(discount)}
            </div>
          )}

          <div className="text-sm space-y-2 mb-6">
            <div className="flex justify-between"><span>Sub total</span><span>Br{fmt(price)}</span></div>
            <div className="flex justify-between"><span>Discounts</span><span>-Br{fmt(discount)}</span></div>
            <div className="flex justify-between font-semibold border-t pt-2"><span>Total:</span><span>Br{fmt(total)}</span></div>
          </div>

          <div className="flex flex-col items-start gap-3">
            <button className="btn-primary px-10">Sign Up</button>
            <button onClick={handlePay} className="btn-primary px-10">Pay Now</button>
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