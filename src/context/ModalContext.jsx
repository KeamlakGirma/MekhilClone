import { createContext, useContext, useState } from 'react'

const ModalContext = createContext(null)

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null) // 'login' | 'signup' | 'forgot' | null
  const open = (name) => setModal(name)
  const close = () => setModal(null)
  return (
    <ModalContext.Provider value={{ modal, open, close }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)