import { useState } from 'react'
import ModalShell from './ModalShell.jsx'
import SocialButtons from '../ui/SocialButtons.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { useModal } from '../../context/ModalContext.jsx'

export default function LoginModal() {
  const { login } = useAuth()
  const { close, open } = useModal()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!email) return
    login(email)
    close()
  }

  return (
    <ModalShell>
      <h2 className="text-center text-xl font-semibold text-navy mb-6">
        Login or sign up to start learning
      </h2>
      <SocialButtons />
      <div className="text-center text-gray-400 text-xs my-4">— OR —</div>
      <form onSubmit={submit} className="space-y-3">
        <label className="block text-sm text-navy">What's your e-mail?</label>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan"
        />
        <label className="block text-sm text-navy mt-3">Password for school?</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan"
        />
        <button type="submit" className="w-full btn-primary mt-2">Login</button>
      </form>
      <div className="flex justify-between text-xs mt-4">
        <button onClick={() => open('signup')} className="text-navy hover:underline">Create Account</button>
        <button onClick={() => open('forgot')} className="text-navy hover:underline">Forgot your password?</button>
      </div>
    </ModalShell>
  )
}