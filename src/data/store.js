// Simple localStorage-backed store so admin + public share data.
const KEYS = {
  users: 'mekhil_users',
  enrollments: 'mekhil_enrollments',
  payments: 'mekhil_payments',
  coupons: 'mekhil_coupons',
  bundles: 'mekhil_bundles',
}

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch { return fallback }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
  window.dispatchEvent(new Event('mekhil-store-change'))
}

// ---- USERS ----
export function getUsers() {
  return read(KEYS.users, [])
}

export function createUser(user) {
  const users = getUsers()
  const newUser = {
    id: 'u_' + Date.now(),
    name: user.name || `${user.firstName} ${user.lastName}`,
    email: user.email,
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    country: user.country || '',
    phone: user.phone || '',
    role: user.role || 'user',
    createdAt: user.createdAt || new Date().toISOString(),
  }
  users.push(newUser)
  write(KEYS.users, users)
  return newUser
}

export function updateUser(id, patch) {
  const users = getUsers().map(u => u.id === id ? { ...u, ...patch } : u)
  write(KEYS.users, users)
}

export function deleteUser(id) {
  write(KEYS.users, getUsers().filter(u => u.id !== id))
}

// ---- ENROLLMENTS ----
export function getEnrollments() {
  return read(KEYS.enrollments, [])
}

export function createEnrollment({ userId, userEmail, userName, courseId, courseTitle }) {
  const enr = getEnrollments()
  const newEnr = {
    id: 'e_' + Date.now(),
    userId,
    userEmail,
    userName,
    courseId,
    courseTitle,
    enrolledAt: new Date().toISOString(),
    progress: 0,
    status: 'active',
    certificateIssued: false,
  }
  enr.push(newEnr)
  write(KEYS.enrollments, enr)
  return newEnr
}

export function updateEnrollment(id, patch) {
  const enr = getEnrollments().map(e => e.id === id ? { ...e, ...patch } : e)
  write(KEYS.enrollments, enr)
}

export function deleteEnrollment(id) {
  write(KEYS.enrollments, getEnrollments().filter(e => e.id !== id))
}

// ---- PAYMENTS ----
export function getPayments() {
  return read(KEYS.payments, [])
}

export function createPayment({ userId, userEmail, userName, itemId, itemTitle, itemType, amount, discount, couponCode }) {
  const payments = getPayments()
  const newP = {
    id: 'p_' + Date.now(),
    transactionId: 'TXN-' + Math.random().toString(36).slice(2, 10).toUpperCase(),
    userId, userEmail, userName,
    itemId, itemTitle, itemType, // 'course' | 'bundle'
    amount,
    discount: discount || 0,
    net: amount - (discount || 0),
    couponCode: couponCode || null,
    status: 'paid',
    createdAt: new Date().toISOString(),
  }
  payments.push(newP)
  write(KEYS.payments, payments)
  return newP
}

export function updatePayment(id, patch) {
  const payments = getPayments().map(p => p.id === id ? { ...p, ...patch } : p)
  write(KEYS.payments, payments)
}

// ---- COUPONS ----
export function getCoupons() {
  return read(KEYS.coupons, [])
}

export function createCoupon(coupon) {
  const coupons = getCoupons()
  const newC = {
    id: 'c_' + Date.now(),
    code: coupon.code.toUpperCase(),
    discountType: coupon.discountType || 'percent', // 'percent' | 'flat'
    amount: Number(coupon.amount) || 0,
    appliesTo: coupon.appliesTo || 'all', // 'all' | courseId
    usageLimit: Number(coupon.usageLimit) || 0,
    perUserLimit: Number(coupon.perUserLimit) || 1,
    usageCount: 0,
    expiresAt: coupon.expiresAt || null,
    active: coupon.active !== false,
    createdAt: new Date().toISOString(),
  }
  coupons.push(newC)
  write(KEYS.coupons, coupons)
  return newC
}

export function updateCoupon(id, patch) {
  const coupons = getCoupons().map(c => c.id === id ? { ...c, ...patch } : c)
  write(KEYS.coupons, coupons)
}

export function deleteCoupon(id) {
  write(KEYS.coupons, getCoupons().filter(c => c.id !== id))
}

// ---- BUNDLES ----
export function getBundles() {
  return read(KEYS.bundles, [])
}

export function createBundle(bundle) {
  const bundles = getBundles()
  const newB = {
    id: 'b_' + Date.now(),
    name: bundle.name,
    description: bundle.description || '',
    courseIds: bundle.courseIds || [],
    price: Number(bundle.price) || 0,
    originalPrice: Number(bundle.originalPrice) || 0,
    active: bundle.active !== false,
    createdAt: new Date().toISOString(),
  }
  bundles.push(newB)
  write(KEYS.bundles, bundles)
  return newB
}

export function updateBundle(id, patch) {
  const bundles = getBundles().map(b => b.id === id ? { ...b, ...patch } : b)
  write(KEYS.bundles, bundles)
}

export function deleteBundle(id) {
  write(KEYS.bundles, getBundles().filter(b => b.id !== id))
}

// ---- HELPERS ----
export function formatCurrency(n, currency = 'Br') {
  return `${currency}${new Intl.NumberFormat('en-US').format(n || 0)}`
}

export function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function formatDateTime(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export function exportCSV(filename, rows, columns) {
  const header = columns.map(c => c.label).join(',')
  const body = rows.map(r =>
    columns.map(c => {
      const v = typeof c.value === 'function' ? c.value(r) : r[c.key]
      const s = String(v ?? '').replace(/"/g, '""')
      return `"${s}"`
    }).join(',')
  ).join('\n')
  const csv = `${header}\n${body}`
  downloadBlob(filename, 'text/csv', csv)
}

export function exportPDF(filename, title, rows, columns) {
  // Minimal PDF generation via HTML print. Opens print dialog in a new window.
  const html = `
    <html><head><title>${title}</title>
    <style>
      body { font-family: system-ui, sans-serif; padding: 24px; color: #1B3A6B; }
      h1 { font-size: 20px; margin-bottom: 16px; }
      table { width: 100%; border-collapse: collapse; font-size: 12px; }
      th, td { border: 1px solid #ddd; padding: 6px 8px; text-align: left; }
      th { background: #f3f4f6; }
    </style></head><body>
    <h1>${title}</h1>
    <table><thead><tr>${columns.map(c => `<th>${c.label}</th>`).join('')}</tr></thead>
    <tbody>${rows.map(r => `<tr>${columns.map(c => {
      const v = typeof c.value === 'function' ? c.value(r) : r[c.key]
      return `<td>${v ?? ''}</td>`
    }).join('')}</tr>`).join('')}</tbody></table>
    </body></html>
  `
  const w = window.open('', '_blank')
  w.document.write(html)
  w.document.close()
  setTimeout(() => w.print(), 250)
}

function downloadBlob(filename, type, content) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}