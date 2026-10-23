import { useState, useMemo } from 'react'

export default function AdminTable({
  columns,
  rows,
  searchKeys = [],
  searchPlaceholder = 'Search…',
  pageSize = 10,
  actions,
}) {
  const [q, setQ] = useState('')
  const [page, setPage] = useState(0)
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState('asc')

  const filtered = useMemo(() => {
    let r = rows
    if (q && searchKeys.length) {
      const term = q.toLowerCase()
      r = r.filter(row => searchKeys.some(k => String(row[k] ?? '').toLowerCase().includes(term)))
    }
    if (sortKey) {
      r = [...r].sort((a, b) => {
        const av = a[sortKey], bv = b[sortKey]
        if (av == null) return 1
        if (bv == null) return -1
        if (typeof av === 'number' && typeof bv === 'number') return sortDir === 'asc' ? av - bv : bv - av
        return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av))
      })
    }
    return r
  }, [rows, q, sortKey, sortDir, searchKeys])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const safePage = Math.min(page, totalPages - 1)
  const pageRows = filtered.slice(safePage * pageSize, (safePage + 1) * pageSize)

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  return (
    <div className="bg-white rounded-lg shadow-card">
      <div className="p-4 border-b flex items-center justify-between gap-4">
        {searchKeys.length > 0 && (
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setPage(0) }}
            placeholder={searchPlaceholder}
            className="border rounded-md px-3 py-2 text-sm w-[280px] outline-none focus:ring-2 focus:ring-cyan"
          />
        )}
        <div className="flex items-center gap-2 ml-auto">
          {actions}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-navy text-xs uppercase tracking-wide">
              {columns.map(col => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-left ${col.sortable ? 'cursor-pointer select-none hover:bg-gray-100' : ''}`}
                  onClick={col.sortable ? () => toggleSort(col.key) : undefined}
                >
                  {col.label}
                  {sortKey === col.key && <span className="ml-1">{sortDir === 'asc' ? '▲' : '▼'}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr><td colSpan={columns.length} className="text-center text-gray-400 py-12">No records</td></tr>
            ) : pageRows.map((row, i) => (
              <tr key={row.id || i} className="border-t hover:bg-gray-50">
                {columns.map(col => (
                  <td key={col.key} className="px-4 py-3 text-gray-700">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t flex items-center justify-between text-xs text-gray-500">
        <div>{filtered.length} record{filtered.length !== 1 ? 's' : ''}</div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={safePage === 0}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >Prev</button>
          <span>Page {safePage + 1} of {totalPages}</span>
          <button
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={safePage >= totalPages - 1}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >Next</button>
        </div>
      </div>
    </div>
  )
}