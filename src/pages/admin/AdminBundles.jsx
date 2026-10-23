import { useState } from 'react'
import AdminTable from '../../components/admin/AdminTable.jsx'
import AdminModal from '../../components/admin/AdminModal.jsx'
import { getBundles, createBundle, updateBundle, deleteBundle, formatCurrency } from '../../data/store.js'
import { useStoreValue } from '../../components/admin/useStore.js'
import courses from '../../data/courses.json'

export default function AdminBundles() {
  const [bundles] = useStoreValue(getBundles)
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(null)

  const columns = [
    { key: 'name', label: 'Bundle', sortable: true },
    { key: 'courseIds', label: 'Courses', render: r => `${r.courseIds.length} course${r.courseIds.length !== 1 ? 's' : ''}` },
    { key: 'originalPrice', label: 'Original', render: r => formatCurrency(r.originalPrice) },
    { key: 'price', label: 'Bundle price', render: r => formatCurrency(r.price) },
    { key: '_save', label: 'Savings', render: r => {
      const save = r.originalPrice - r.price
      return save > 0 ? `${formatCurrency(save)} (${Math.round(save / r.originalPrice * 100)}%)` : '—'
    }},
    { key: 'active', label: 'Active', render: r => r.active ? '✅' : '⛔' },
    { key: '_actions', label: '', render: r => (
      <div className="flex gap-2 text-xs">
        <button onClick={() => { setEdit(r); setOpen(true) }} className="text-navy hover:underline">Edit</button>
        <button onClick={() => updateBundle(r.id, { active: !r.active })} className="text-cyan hover:underline">{r.active ? 'Disable' : 'Enable'}</button>
        <button onClick={() => { if (confirm('Delete bundle?')) deleteBundle(r.id) }} className="text-red-500 hover:underline">Delete</button>
      </div>
    )},
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-navy font-semibold text-lg">Bundles</h2>
      <AdminTable
        columns={columns}
        rows={bundles}
        searchKeys={['name']}
        searchPlaceholder="Search bundles…"
        actions={<button onClick={() => { setEdit(null); setOpen(true) }} className="btn-primary text-sm px-4 py-1.5">+ Create Bundle</button>}
      />
      <BundleModal open={open} onClose={() => { setOpen(false); setEdit(null) }} bundle={edit} />
    </div>
  )
}

function BundleModal({ open, onClose, bundle }) {
  const [form, setForm] = useState(bundle || {
    name: '', description: '', courseIds: [], price: 0, originalPrice: 0, active: true,
  })

  const toggleCourse = (id) => {
    setForm(f => ({
      ...f,
      courseIds: f.courseIds.includes(id) ? f.courseIds.filter(x => x !== id) : [...f.courseIds, id],
    }))
  }

  const autoCalcOriginal = () => {
    const total = form.courseIds.reduce((s, id) => {
      const c = courses.find(x => x.id === id)
      return s + (c?.price || 0)
    }, 0)
    setForm(f => ({ ...f, originalPrice: total }))
  }

  const save = () => {
    if (!form.name || form.courseIds.length === 0) return alert('Name and at least one course required')
    if (bundle) updateBundle(bundle.id, form)
    else createBundle(form)
    onClose()
  }

  return (
    <AdminModal open={open} onClose={onClose} title={bundle ? `Edit ${bundle.name}` : 'Create Bundle'} width={640}>
      <div className="space-y-3">
        <div>
          <label className="text-xs text-gray-600">Bundle name *</label>
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border rounded-md px-3 py-2 text-sm mt-1" />
        </div>
        <div>
          <label className="text-xs text-gray-600">Description</label>
          <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} className="w-full border rounded-md px-3 py-2 text-sm mt-1" />
        </div>
        <div>
          <label className="text-xs text-gray-600 mb-2 block">Included courses *</label>
          <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-auto border rounded p-3">
            {courses.map(c => (
              <label key={c.id} className="flex items-start gap-2 text-xs">
                <input
                  type="checkbox"
                  checked={form.courseIds.includes(c.id)}
                  onChange={() => toggleCourse(c.id)}
                  className="mt-0.5"
                />
                <span>{c.title}</span>
              </label>
            ))}
          </div>
          <button onClick={autoCalcOriginal} className="text-xs text-cyan hover:underline mt-2">
            Auto-calculate original price
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-600">Original price (Br)</label>
            <input type="number" value={form.originalPrice} onChange={e => setForm({ ...form, originalPrice: Number(e.target.value) })} className="w-full border rounded-md px-3 py-2 text-sm mt-1" />
          </div>
          <div>
            <label className="text-xs text-gray-600">Bundle price (Br)</label>
            <input type="number" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} className="w-full border rounded-md px-3 py-2 text-sm mt-1" />
          </div>
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