import { useState } from 'react'
import ModalShell from './ModalShell.jsx'
import SocialButtons from '../ui/SocialButtons.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { useModal } from '../../context/ModalContext.jsx'

const COUNTRIES = ['Ethiopia', 'Kenya', 'United States', 'United Kingdom', 'Other']

export default function SignupModal() {
  const { signup } = useAuth()
  const { close } = useModal()
  const [form, setForm] = useState({
    name: '', email: '', password: '', firstName: '', lastName: '',
    country: '', phone: '', newsletter: true,
  })
  const [showPw, setShowPw] = useState(false)

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    signup(form)
    close()
  }

  return (
    <ModalShell width={520}>
      <h2 className="text-center text-xl font-semibold text-navy mb-6">
        Sign up to Mekhil Empowerment &amp; Training Center!
      </h2>
      <SocialButtons />
      <div className="text-center text-gray-400 text-xs my-4">— or —</div>
      <form onSubmit={submit} className="space-y-3">
        <Field label="What's your name? *" placeholder="Name" value={form.name} onChange={set('name')} />
        <Field label="What's your e-mail? *" type="email" placeholder="E-mail" value={form.email} onChange={set('email')} />
        <div>
          <label className="block text-sm text-navy mb-1">Password for school? *</label>
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              placeholder="Password"
              value={form.password}
              onChange={set('password')}
              className="w-full rounded-md bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan pr-12"
            />
            <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {showPw ? '🙈' : '👁'}
            </button>
          </div>
        </div>
        <Field label="First Name *" placeholder="First Name" value={form.firstName} onChange={set('firstName')} />
        <Field label="Last Name *" placeholder="Last Name" value={form.lastName} onChange={set('lastName')} />

        <div>
          <label className="block text-sm text-navy mb-1">Country *</label>
          <select
            value={form.country}
            onChange={set('country')}
            className="w-full rounded-md bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan"
          >
            <option value="">Country</option>
            {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <Field
          label="Phone Number *"
          placeholder="+251XXXXXXXXX | 09XXXXXXXX"
          value={form.phone}
          onChange={set('phone')}
        />

        <label className="flex items-start gap-2 text-xs text-navy mt-2">
          <input
            type="checkbox"
            checked={form.newsletter}
            onChange={(e) => setForm({ ...form, newsletter: e.target.checked })}
            className="mt-1"
          />
          Subscribe to newsletter and offers?
        </label>

        <button type="submit" className="w-full btn-primary mt-2">Sign Up</button>
      </form>
    </ModalShell>
  )
}

function Field({ label, type = 'text', placeholder, value, onChange }) {
  return (
    <div>
      <label className="block text-sm text-navy mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-md bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan"
      />
    </div>
  )
}