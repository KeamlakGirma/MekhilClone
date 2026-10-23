import AdminTable from '../../components/admin/AdminTable.jsx'
import { getPayments, updatePayment, exportCSV, exportPDF, formatDate, formatCurrency } from '../../data/store.js'
import { useStoreValue } from '../../components/admin/useStore.js'
import KpiCard from '../../components/admin/KpiCard.jsx'

export default function AdminPayments() {
  const [payments] = useStoreValue(getPayments)

  const gross = payments.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0)
  const discounts = payments.filter(p => p.status === 'paid').reduce((s, p) => s + p.discount, 0)
  const net = payments.filter(p => p.status === 'paid').reduce((s, p) => s + p.net, 0)
  const pending = payments.filter(p => p.status === 'pending').length

  const columns = [
    { key: 'transactionId', label: 'Transaction ID', sortable: true },
    { key: 'userName', label: 'User', sortable: true },
    { key: 'itemTitle', label: 'Item', sortable: true },
    { key: 'itemType', label: 'Type', render: r => (
      <span className={`text-xs px-2 py-0.5 rounded ${r.itemType === 'bundle' ? 'bg-navy text-white' : 'bg-cyan/20 text-navy'}`}>
        {r.itemType || 'course'}
      </span>
    )},
    { key: 'amount', label: 'Amount', sortable: true, render: r => formatCurrency(r.amount) },
    { key: 'discount', label: 'Discount', render: r => r.discount ? `-${formatCurrency(r.discount)}` : '—' },
    { key: 'net', label: 'Net', render: r => formatCurrency(r.net) },
    { key: 'couponCode', label: 'Coupon', render: r => r.couponCode || '—' },
    { key: 'status', label: 'Status', render: r => (
      <span className={`text-xs px-2 py-0.5 rounded ${
        r.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
        r.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
      }`}>{r.status}</span>
    )},
    { key: 'createdAt', label: 'Date', sortable: true, render: r => formatDate(r.createdAt) },
    { key: '_actions', label: '', render: r => (
      <select
        value={r.status}
        onChange={e => updatePayment(r.id, { status: e.target.value })}
        className="text-xs border rounded px-2 py-1"
      >
        <option value="paid">paid</option>
        <option value="pending">pending</option>
        <option value="refunded">refunded</option>
      </select>
    )},
  ]

  const exportColumns = [
    { key: 'transactionId', label: 'Transaction ID' },
    { key: 'userName', label: 'User' },
    { key: 'userEmail', label: 'Email' },
    { key: 'itemTitle', label: 'Item' },
    { key: 'itemType', label: 'Type' },
    { key: 'amount', label: 'Amount' },
    { key: 'discount', label: 'Discount' },
    { key: 'net', label: 'Net' },
    { key: 'couponCode', label: 'Coupon' },
    { key: 'status', label: 'Status' },
    { key: 'createdAt', label: 'Date', value: r => formatDate(r.createdAt) },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-navy font-semibold text-lg">Payments / Sales</h2>

      <div className="grid grid-cols-4 gap-4">
        <KpiCard label="Gross revenue" value={formatCurrency(gross)} />
        <KpiCard label="Discounts" value={formatCurrency(discounts)} accent="cyan" />
        <KpiCard label="Net revenue" value={formatCurrency(net)} accent="green" />
        <KpiCard label="Pending" value={pending} />
      </div>

      <AdminTable
        columns={columns}
        rows={payments}
        searchKeys={['transactionId', 'userName', 'userEmail', 'itemTitle']}
        searchPlaceholder="Search payments…"
        actions={
          <>
            <button onClick={() => exportCSV('payments.csv', payments, exportColumns)} className="text-xs border rounded px-3 py-1.5 hover:bg-gray-50">Export CSV</button>
            <button onClick={() => exportPDF('payments.pdf', 'Payments Report', payments, exportColumns)} className="text-xs border rounded px-3 py-1.5 hover:bg-gray-50">Export PDF</button>
          </>
        }
      />
    </div>
  )
}