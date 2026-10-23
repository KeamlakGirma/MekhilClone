import { Link } from 'react-router-dom'

export default function BundleCard({ bundle }) {
  const fmt = (n) => new Intl.NumberFormat('en-US').format(n)
  const savings = bundle.originalPrice - bundle.price
  const pct = bundle.originalPrice > 0 ? Math.round((savings / bundle.originalPrice) * 100) : 0

  return (
    <div className="card flex flex-col">
      <div className="bg-navy text-white px-4 py-2 text-xs font-medium">
        📦 Bundle — Save {pct}%
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-navy font-semibold text-lg mb-2">{bundle.name}</h3>
        <p className="text-gray-600 text-xs leading-relaxed mb-4 flex-1">{bundle.description}</p>
        <div className="text-xs text-gray-500 mb-3">{bundle.courseIds.length} courses included</div>
        <div className="text-center mb-4">
          <span className="text-gray-400 line-through text-xs mr-2">Br{fmt(bundle.originalPrice)}</span>
          <span className="text-navy font-bold">Br{fmt(bundle.price)}</span>
        </div>
        <Link to={`/payment?product_id=${bundle.id}&type=bundle`} className="btn-navy text-center text-sm">Get Bundle</Link>
      </div>
    </div>
  )
}