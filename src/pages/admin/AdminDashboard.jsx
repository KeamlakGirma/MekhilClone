import { useMemo } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import KpiCard from '../../components/admin/KpiCard.jsx'
import { getUsers, getEnrollments, getPayments, formatCurrency, formatDate } from '../../data/store.js'
import { useStoreValue } from '../../components/admin/useStore.js'

export default function AdminDashboard() {
  const [users] = useStoreValue(getUsers)
  const [enrollments] = useStoreValue(getEnrollments)
  const [payments] = useStoreValue(getPayments)

  const now = Date.now()
  const d7 = now - 7 * 24 * 60 * 60 * 1000
  const d30 = now - 30 * 24 * 60 * 60 * 1000

  const newSignups = users.filter(u => new Date(u.createdAt).getTime() > d7).length
  const activeEnrollments = enrollments.filter(e => e.status === 'active').length
  const revenue30 = payments
    .filter(p => new Date(p.createdAt).getTime() > d30 && p.status === 'paid')
    .reduce((sum, p) => sum + (p.net || 0), 0)

  // Signups over last 30 days
  const signupSeries = useMemo(() => {
    const days = []
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now - i * 24 * 60 * 60 * 1000)
      const key = d.toISOString().slice(0, 10)
      days.push({ date: d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }), key, count: 0 })
    }
    users.forEach(u => {
      const k = new Date(u.createdAt).toISOString().slice(0, 10)
      const day = days.find(d => d.key === k)
      if (day) day.count++
    })
    return days
  }, [users, now])

  // Revenue by course
  const revenueByCourse = useMemo(() => {
    const map = {}
    payments.filter(p => p.status === 'paid').forEach(p => {
      map[p.itemTitle] = (map[p.itemTitle] || 0) + (p.net || 0)
    })
    return Object.entries(map).map(([name, value]) => ({ name: name.slice(0, 22), value }))
  }, [payments])

  // Recent activity — merge latest signups + payments
  const recent = useMemo(() => {
    const items = [
      ...users.slice(-5).map(u => ({ type: 'signup', when: u.createdAt, text: `${u.name} signed up`, email: u.email })),
      ...payments.slice(-5).map(p => ({ type: 'payment', when: p.createdAt, text: `${p.userName} paid ${formatCurrency(p.net)}`, email: p.itemTitle })),
    ]
    return items.sort((a, b) => new Date(b.when) - new Date(a.when)).slice(0, 8)
  }, [users, payments])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <KpiCard label="Total users" value={users.length} sub={`+${newSignups} this week`} />
        <KpiCard label="Active enrollments" value={activeEnrollments} accent="cyan" />
        <KpiCard label="Revenue (30d)" value={formatCurrency(revenue30)} accent="green" />
        <KpiCard label="Total transactions" value={payments.length} />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-card p-5">
          <h3 className="text-navy font-semibold mb-4 text-sm">Signups — last 30 days</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={signupSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} interval={4} />
              <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#3FBBD9" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-card p-5">
          <h3 className="text-navy font-semibold mb-4 text-sm">Revenue by course</h3>
          {revenueByCourse.length === 0 ? (
            <div className="text-gray-400 text-sm text-center py-16">No payments yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={revenueByCourse}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip formatter={(v) => formatCurrency(v)} />
                <Bar dataKey="value" fill="#1B3A6B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-card p-5">
        <h3 className="text-navy font-semibold mb-4 text-sm">Recent activity</h3>
        {recent.length === 0 ? (
          <div className="text-gray-400 text-sm py-6">Nothing yet — activity will appear as users sign up and purchase.</div>
        ) : (
          <ul className="divide-y">
            {recent.map((r, i) => (
              <li key={i} className="py-3 flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${r.type === 'signup' ? 'bg-cyan' : 'bg-emerald-500'}`} />
                  <span className="text-navy">{r.text}</span>
                </div>
                <span className="text-xs text-gray-400">{formatDate(r.when)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}