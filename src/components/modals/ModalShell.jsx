import { useModal } from '../../context/ModalContext.jsx'

export default function ModalShell({ children, width = 480 }) {
  const { close } = useModal()
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-lg shadow-2xl relative w-full" style={{ maxWidth: width }}>
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-400 hover:text-navy text-xl leading-none"
          aria-label="Close"
        >×</button>
        <div className="p-8">{children}</div>
      </div>
    </div>
  )
}