import { useState, useMemo } from 'react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'
import { getUsers, getEnrollments, getPayments, exportCSV, exportPDF, formatDate, formatCurrency } from '../../data/store.js'
import { useStoreValue } from '../../components/admin/useStore.js'

const COLORS = ['#1B3A6B', '#3FBBD9', '#7DD3E8', '#152E56', '#2A9BB8']

export default function AdminReports() {
  const [users] = useStoreValue(getUsers)
  const [enrollments] = useStoreValue(getEnrollments)
  const [payments] = useStoreValue(getPayments)
  const [range, setRange] = useState('30')
  const [report, setReport] = useState('revenue')

  const cutoff = useMemo(() => Date.now() - Number(range) * 24 * 60 * 60 * 1000, [range])

  const filteredPayments = payments.filter(p => new Date(p.createdAt).getTime() > cutoff)
  const filteredEnrollments = enrollments.filter(e => new Date(e.enrolledAt).getTime() > cutoff)
  const filteredUsers = users.filter(u => new Date(u.createdAt).getTime() > cutoff)

  // Revenue per day
  const revenueSeries = useMemo(() => {
    const days = []
    const n = Number(range)
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
      const key = d.toISOString().slice(0, 10)
      days.push({ date: d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }), key, revenue: 0, count: 0 })
    }
    filteredPayments.filter(p => p.status === 'paid').forEach(p => {
      const k = new Date(p.createdAt).toISOString().slice(0, 10)
      const day = days.find(d => d.key === k)
      if (day) { day.revenue += p.net; day.count++ }
    })
    return days
  }, [filteredPayments, range])

  // Enrollment per course (pie)
  const enrollByCourse = useMemo(() => {
    const map = {}
    filteredEnrollments.forEach(e => { map[e.courseTitle] = (map[e.courseTitle] || 0) + 1 })
    return Object.entries(map).map(([name, value]) => ({ name: name.slice(0, 20), value }))
  }, [filteredEnrollments])

  const reportConfig = {
    revenue: {
      title: 'Revenue report',
      columns: [
        { key: 'transactionId', label: 'Txn ID' },
        { key: 'userName', label: 'User' },
        { key: 'itemTitle', label: 'Item' },
        { key: 'amount', label: 'Amount', value: r => formatCurrency(r.amount) },
        { key: 'discount', label: 'Discount', value: r => formatCurrency(r.discount) },
        { key: 'net', label: 'Net', value: r => formatCurrency(r.net) },
        { key: 'status', label: 'Status' },
        { key: 'createdAt', label: 'Date', value: r => formatDate(r.createdAt) },
      ],
      rows: filteredPayments,
    },
    enrollments: {
      title: 'Enrollments report',
      columns: [
        { key: 'userName', label: 'User' },
        { key: 'courseTitle', label: 'Course' },
        { key: 'progress', label: 'Progress %' },
        { key: 'status', label: 'Status' },
        { key: 'enrolledAt', label: 'Enrolled', value: r => formatDate(r.enrolledAt) },
      ],
      rows: filteredEnrollments,
    },
    signups: {
      title: 'Signups report',
      columns: [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'country', label: 'Country' },
        { key: 'role', label: 'Role' },
        { key: 'createdAt', label: 'Signed up', value: r => formatDate(r.createdAt) },
      ],
      rows: filteredUsers,
    },
  }

  const cfg = reportConfig[report]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-navy font-semibold text-lg">Reports</h2>
        <div className="flex items-center gap-3">
          <select value={range} onChange={e => setRange(e.target.value)} className="text-sm border rounded px-3 py-1.5">
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
          <select value={report} onChange={e => setReport(e.target.value)} className="text-sm border rounded px-3 py-1.5">
            <option value="revenue">Revenue</option>
            <option value="enrollments">Enrollments</option>
            <option value="signups">Signups</option>
          </select>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-card p-5">
          <h3 className="text-navy font-semibold mb-4 text-sm">Revenue trend</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={revenueSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} interval={Math.max(0, Math.floor(revenueSeries.length / 6) - 1)} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip formatter={v => formatCurrency(v)} />
              <Line type="monotone" dataKey="revenue" stroke="#1B3A6B" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-card p-5">
          <h3 className="text-navy font-semibold mb-4 text-sm">Enrollments by course</h3>
          {enrollByCourse.length === 0 ? (
            <div className="text-gray-400 text-sm text-center py-20">No enrollments in this period</div>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={enrollByCourse} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={{ fontSize: 10 }}>
                  {enrollByCourse.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Table + export */}
      <div className="bg-white rounded-lg shadow-card">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-navy font-semibold text-sm">{cfg.title} — {cfg.rows.length} records</h3>
          <div className="flex gap-2">
            <button onClick={() => exportCSV(`${report}.csv`, cfg.rows, cfg.columns)} className="text-xs border rounded px-3 py-1.5 hover:bg-gray-50">Export CSV</button>
            <button onClick={() => exportPDF(`${report}.pdf`, cfg.title, cfg.rows, cfg.columns)} className="text-xs border rounded px-3 py-1.5 hover:bg-gray-50">Export PDF</button>
          </div>
        </div>
        <div className="overflow-x-auto max-h-[400px]">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 sticky top-0">
              <tr className="text-navy text-xs uppercase">
                {cfg.columns.map(c => <th key={c.key} className="text-left px-4 py-3">{c.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {cfg.rows.length === 0 ? (
                <tr><td colSpan={cfg.columns.length} className="text-center text-gray-400 py-10">No data for this period</td></tr>
              ) : cfg.rows.map((r, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  {cfg.columns.map(c => (
                    <td key={c.key} className="px-4 py-3 text-gray-700">
                      {typeof c.value === 'function' ? c.value(r) : r[c.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}