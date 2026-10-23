export default function KpiCard({ label, value, sub, accent = 'navy' }) {
  const bg = accent === 'cyan' ? 'bg-cyan' : accent === 'green' ? 'bg-emerald-500' : 'bg-navy'
  return (
    <div className="bg-white rounded-lg shadow-card p-5">
      <div className={`w-10 h-10 rounded-md ${bg} mb-3`} />
      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{label}</div>
      <div className="text-2xl font-bold text-navy">{value}</div>
      {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
    </div>
  )
}