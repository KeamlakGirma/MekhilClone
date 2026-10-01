import { useState } from 'react'
import ModalShell from './ModalShell.jsx'
import { useModal } from '../../context/ModalContext.jsx'

export default function ForgotPasswordModal() {
  const { close } = useModal()
  const [email, setEmail] = useState('')
  return (
    <ModalShell width={420}>
      <h2 className="text-lg font-semibold text-navy mb-4">Get a brand new password!</h2>
      <label className="block text-sm text-navy mb-2">What's your e-mail?</label>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-md bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan"
      />
      <div className="flex gap-3 justify-center mt-6">
        <button onClick={close} className="btn-primary min-w-[100px]">OK</button>
        <button onClick={close} className="btn-primary min-w-[100px]">Cancel</button>
      </div>
    </ModalShell>
  )
}