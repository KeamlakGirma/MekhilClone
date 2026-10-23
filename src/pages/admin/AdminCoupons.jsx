import { useState } from 'react'
import AdminTable from '../../components/admin/AdminTable.jsx'
import AdminModal from '../../components/admin/AdminModal.jsx'
import { getCoupons, createCoupon, updateCoupon, deleteCoupon, formatDate } from '../../data/store.js'
import { useStoreValue } from '../../components/admin/useStore.js'
import courses from '../../data/courses.json'

export default function AdminCoupons() {
  const [coupons] = useStoreValue(getCoupons)
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(null)

  const columns = [
    { key: 'code', label: 'Code', sortable: true, render: r => (
      <span className="font-mono text-navy font-semibold">{r.code}</span>
    )},
    { key: 'discountType', label: 'Type', render: r => r.discountType === 'percent' ? `${r.amount}%` : `Br${r.amount}` },
    { key: 'appliesTo', label: 'Applies to', render: r => r.appliesTo === 'all' ? 'All courses' : courses.find(c => c.id === r.appliesTo)?.title?.slice(0, 25) || r.appliesTo },
    { key: 'usageCount', label: 'Used', render: r => `${r.usageCount}${r.usageLimit ? ` / ${r.usageLimit}` : ''}` },
    { key: 'expiresAt', label: 'Expires', render: r => r.expiresAt ? formatDate(r.expiresAt) : '—' },
    { key: 'active', label: 'Active', render: r => r.active ? '✅' : '⛔' },
    { key: '_actions', label: '', render: r => (
      <div className="flex gap-2 text-xs">
        <button onClick={() => { setEdit(r); setOpen(true) }} className="text-navy hover:underline">Edit</button>
        <button onClick={() => updateCoupon(r.id, { active: !r.active })} className="text-cyan hover:underline">{r.active ? 'Disable' : 'Enable'}</button>
        <button onClick={() => { if (confirm('Delete coupon?')) deleteCoupon(r.id) }} className="text-red-500 hover:underline">Delete</button>
      </div>
    )},
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-navy font-semibold text-lg">Coupons</h2>
      <AdminTable
        columns={columns}
        rows={coupons}
        searchKeys={['code']}
        searchPlaceholder="Search coupons…"
        actions={<button onClick={() => { setEdit(null); setOpen(true) }} className="btn-primary text-sm px-4 py-1.5">+ Create Coupon</button>}
      />
      <CouponModal open={open} onClose={() => { setOpen(false); setEdit(null) }} coupon={edit} />
    </div>
  )
}

function CouponModal({ open, onClose, coupon }) {
  const [form, setForm] = useState(coupon || {
    code: '', discountType: 'percent', amount: 10, appliesTo: 'all',
    usageLimit: 0, perUserLimit: 1, expiresAt: '', active: true,
  })

  const set = k => e => setForm({ ...form, [k]: e.target.value })

  const save = () => {
    if (!form.code) return alert('Code required')
    if (coupon) updateCoupon(coupon.id, form)
    else createCoupon(form)
    onClose()
  }

  return (
    <AdminModal open={open} onClose={onClose} title={coupon ? `Edit ${coupon.code}` : 'Create Coupon'}>
      <div className="space-y-3">
        <div>
          <label className="text-xs text-gray-600">Code *</label>
          <input value={form.code} onChange={set('code')} className="w-full border rounded-md px-3 py-2 text-sm mt-1 font-mono uppercase" placeholder="SUMMER25" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-600">Discount type</label>
            <select value={form.discountType} onChange={set('discountType')} className="w-full border rounded-md px-3 py-2 text-sm mt-1">
              <option value="percent">Percent (%)</option>
              <option value="flat">Flat (Br)</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-600">Amount</label>
            <input type="number" value={form.amount} onChange={set('amount')} className="w-full border rounded-md px-3 py-2 text-sm mt-1" />
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-600">Applies to</label>
          <select value={form.appliesTo} onChange={set('appliesTo')} className="w-full border rounded-md px-3 py-2 text-sm mt-1">
            <option value="all">All courses</option>
            {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-600">Usage limit (0 = unlimited)</label>
            <input type="number" value={form.usageLimit} onChange={set('usageLimit')} className="w-full border rounded-md px-3 py-2 text-sm mt-1" />
          </div>
          <div>
            <label className="text-xs text-gray-600">Per-user limit</label>
            <input type="number" value={form.perUserLimit} onChange={set('perUserLimit')} className="w-full border rounded-md px-3 py-2 text-sm mt-1" />
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-600">Expiry date</label>
          <input type="date" value={form.expiresAt?.slice(0, 10) || ''} onChange={set('expiresAt')} className="w-full border rounded-md px-3 py-2 text-sm mt-1" />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} />
          Active
        </label>
        <div className="flex justify-end gap-2 pt-3">
          <button onClick={onClose} className="text-sm px-4 py-2 border rounded">Cancel</button>
          <button onClick={save} className="btn-primary text-sm px-6 py-2">Save</button>
        </div>
      </div>
    </AdminModal>
  )
}