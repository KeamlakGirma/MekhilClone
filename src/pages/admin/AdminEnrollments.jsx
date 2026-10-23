import AdminTable from '../../components/admin/AdminTable.jsx'
import { getEnrollments, updateEnrollment, deleteEnrollment, exportCSV, exportPDF, formatDate } from '../../data/store.js'
import { useStoreValue } from '../../components/admin/useStore.js'

export default function AdminEnrollments() {
  const [enrollments] = useStoreValue(getEnrollments)

  const columns = [
    { key: 'userName', label: 'User', sortable: true },
    { key: 'userEmail', label: 'Email' },
    { key: 'courseTitle', label: 'Course', sortable: true },
    { key: 'enrolledAt', label: 'Enrolled', sortable: true, render: r => formatDate(r.enrolledAt) },
    { key: 'progress', label: 'Progress', sortable: true, render: r => (
      <div className="flex items-center gap-2">
        <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-cyan" style={{ width: `${r.progress}%` }} />
        </div>
        <span className="text-xs text-gray-500">{r.progress}%</span>
      </div>
    )},
    { key: 'status', label: 'Status', render: r => (
      <span className={`text-xs px-2 py-0.5 rounded ${
        r.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
        r.status === 'completed' ? 'bg-cyan/20 text-navy' : 'bg-gray-100 text-gray-500'
      }`}>{r.status}</span>
    )},
    { key: 'certificateIssued', label: 'Cert.', render: r => r.certificateIssued ? '✅' : '—' },
    { key: '_actions', label: '', render: r => (
      <div className="flex gap-2 text-xs">
        <button onClick={() => updateEnrollment(r.id, { certificateIssued: !r.certificateIssued })} className="text-navy hover:underline">
          {r.certificateIssued ? 'Revoke cert' : 'Issue cert'}
        </button>
        <button onClick={() => { if (confirm('Revoke this enrollment?')) deleteEnrollment(r.id) }} className="text-red-500 hover:underline">Revoke</button>
      </div>
    )},
  ]

  const exportColumns = [
    { key: 'userName', label: 'User' },
    { key: 'userEmail', label: 'Email' },
    { key: 'courseTitle', label: 'Course' },
    { key: 'enrolledAt', label: 'Enrolled', value: r => formatDate(r.enrolledAt) },
    { key: 'progress', label: 'Progress %' },
    { key: 'status', label: 'Status' },
    { key: 'certificateIssued', label: 'Certificate' },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-navy font-semibold text-lg">Enrollments</h2>
      <AdminTable
        columns={columns}
        rows={enrollments}
        searchKeys={['userName', 'userEmail', 'courseTitle']}
        searchPlaceholder="Search enrollments…"
        actions={
          <>
            <button onClick={() => exportCSV('enrollments.csv', enrollments, exportColumns)} className="text-xs border rounded px-3 py-1.5 hover:bg-gray-50">Export CSV</button>
            <button onClick={() => exportPDF('enrollments.pdf', 'Enrollments Report', enrollments, exportColumns)} className="text-xs border rounded px-3 py-1.5 hover:bg-gray-50">Export PDF</button>
          </>
        }
      />
    </div>
  )
}