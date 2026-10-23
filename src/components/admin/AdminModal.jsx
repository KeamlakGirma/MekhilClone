export default function AdminModal({ open, onClose, title, children, width = 560 }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-h-[90vh] overflow-auto" style={{ maxWidth: width }}>
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-navy font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-navy text-xl leading-none">×</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}