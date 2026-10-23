import { useState } from 'react'
import AdminTable from '../../components/admin/AdminTable.jsx'
import AdminModal from '../../components/admin/AdminModal.jsx'
import { getUsers, createUser, updateUser, deleteUser, getEnrollments, createEnrollment, exportCSV, exportPDF, formatDate } from '../../data/store.js'
import { useStoreValue } from '../../components/admin/useStore.js'
import courses from '../../data/courses.json'

export default function AdminUsers() {
  const [users] = useStoreValue(getUsers)
  const [enrollments] = useStoreValue(getEnrollments)
  const [createOpen, setCreateOpen] = useState(false)
  const [editUser, setEditUser] = useState(null)
  const [enrollFor, setEnrollFor] = useState(null)

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'country', label: 'Country' },
    { key: 'phone', label: 'Phone' },
    { key: 'role', label: 'Role', render: r => (
      <span className={`text-xs px-2 py-0.5 rounded ${r.role === 'admin' ? 'bg-navy text-white' : 'bg-gray-100 text-gray-700'}`}>
        {r.role || 'user'}
      </span>
    )},
    { key: 'createdAt', label: 'Signed up', sortable: true, render: r => formatDate(r.createdAt) },
    { key: 'enrolled', label: 'Enrollments', render: r => enrollments.filter(e => e.userId === r.id).length },
    { key: '_actions', label: '', render: r => (
      <div className="flex gap-2 text-xs">
        <button onClick={() => setEditUser(r)} className="text-navy hover:underline">Edit</button>
        <button onClick={() => setEnrollFor(r)} className="text-cyan hover:underline">Enroll</button>
        <button onClick={() => { if (confirm(`Delete ${r.email}?`)) deleteUser(r.id) }} className="text-red-500 hover:underline">Delete</button>
      </div>
    )},
  ]

  const exportColumns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'country', label: 'Country' },
    { key: 'phone', label: 'Phone' },
    { key: 'role', label: 'Role' },
    { key: 'createdAt', label: 'Signed up', value: r => formatDate(r.createdAt) },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-navy font-semibold text-lg">Users</h2>
      </div>

      <AdminTable
        columns={columns}
        rows={users}
        searchKeys={['name', 'email', 'country']}
        searchPlaceholder="Search users…"
        actions={
          <>
            <button onClick={() => exportCSV('users.csv', users, exportColumns)} className="text-xs border rounded px-3 py-1.5 hover:bg-gray-50">Export CSV</button>
            <button onClick={() => exportPDF('users.pdf', 'Users Report', users, exportColumns)} className="text-xs border rounded px-3 py-1.5 hover:bg-gray-50">Export PDF</button>
            <button onClick={() => setCreateOpen(true)} className="btn-primary text-sm px-4 py-1.5">+ Create User</button>
          </>
        }
      />

      <CreateUserModal open={createOpen} onClose={() => setCreateOpen(false)} />
      <EditUserModal user={editUser} onClose={() => setEditUser(null)} />
      <EnrollModal user={enrollFor} onClose={() => setEnrollFor(null)} />
    </div>
  )
}

function CreateUserModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', firstName: '', lastName: '', country: '', phone: '', role: 'user' })
  const set = k => e => setForm({ ...form, [k]: e.target.value })

  const submit = () => {
    if (!form.email) return alert('Email required')
    createUser(form)
    onClose()
    setForm({ name: '', email: '', firstName: '', lastName: '', country: '', phone: '', role: 'user' })
  }

  return (
    <AdminModal open={open} onClose={onClose} title="Create User">
      <div className="space-y-3">
        <Input label="Full name" value={form.name} onChange={set('name')} />
        <Input label="Email *" type="email" value={form.email} onChange={set('email')} />
        <div className="grid grid-cols-2 gap-3">
          <Input label="First name" value={form.firstName} onChange={set('firstName')} />
          <Input label="Last name" value={form.lastName} onChange={set('lastName')} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input label="Country" value={form.country} onChange={set('country')} />
          <Input label="Phone" value={form.phone} onChange={set('phone')} />
        </div>
        <div>
          <label className="text-xs text-gray-600">Role</label>
          <select value={form.role} onChange={set('role')} className="w-full border rounded-md px-3 py-2 text-sm mt-1">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex justify-end gap-2 pt-3">
          <button onClick={onClose} className="text-sm px-4 py-2 border rounded">Cancel</button>
          <button onClick={submit} className="btn-primary text-sm px-6 py-2">Create</button>
        </div>
      </div>
    </AdminModal>
  )
}

function EditUserModal({ user, onClose }) {
  const [form, setForm] = useState(user || {})
  if (!user) return null
  const set = k => e => setForm({ ...form, [k]: e.target.value })

  const save = () => {
    updateUser(user.id, form)
    onClose()
  }

  return (
    <AdminModal open={!!user} onClose={onClose} title={`Edit ${user.email}`}>
      <div className="space-y-3">
        <Input label="Full name" value={form.name || ''} onChange={set('name')} />
        <Input label="Email" value={form.email || ''} onChange={set('email')} />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Country" value={form.country || ''} onChange={set('country')} />
          <Input label="Phone" value={form.phone || ''} onChange={set('phone')} />
        </div>
        <div>
          <label className="text-xs text-gray-600">Role</label>
          <select value={form.role || 'user'} onChange={set('role')} className="w-full border rounded-md px-3 py-2 text-sm mt-1">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex justify-end gap-2 pt-3">
          <button onClick={onClose} className="text-sm px-4 py-2 border rounded">Cancel</button>
          <button onClick={save} className="btn-primary text-sm px-6 py-2">Save</button>
        </div>
      </div>
    </AdminModal>
  )
}

function EnrollModal({ user, onClose }) {
  const [selected, setSelected] = useState('')
  if (!user) return null

  const submit = () => {
    const c = courses.find(x => x.id === selected)
    if (!c) return
    createEnrollment({
      userId: user.id,
      userEmail: user.email,
      userName: user.name || user.email,
      courseId: c.id,
      courseTitle: c.title,
    })
    onClose()
  }

  return (
    <AdminModal open={!!user} onClose={onClose} title={`Enroll ${user.email}`}>
      <div className="space-y-3">
        <div>
          <label className="text-xs text-gray-600">Course</label>
          <select value={selected} onChange={e => setSelected(e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm mt-1">
            <option value="">— select —</option>
            {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
        </div>
        <div className="flex justify-end gap-2 pt-3">
          <button onClick={onClose} className="text-sm px-4 py-2 border rounded">Cancel</button>
          <button onClick={submit} className="btn-primary text-sm px-6 py-2" disabled={!selected}>Enroll</button>
        </div>
      </div>
    </AdminModal>
  )
}

function Input({ label, type = 'text', value, onChange }) {
  return (
    <div>
      <label className="text-xs text-gray-600">{label}</label>
      <input type={type} value={value} onChange={onChange} className="w-full border rounded-md px-3 py-2 text-sm mt-1 outline-none focus:ring-2 focus:ring-cyan" />
    </div>
  )
}