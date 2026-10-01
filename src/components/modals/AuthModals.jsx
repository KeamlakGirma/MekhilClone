import { useModal } from '../../context/ModalContext.jsx'
import LoginModal from './LoginModal.jsx'
import SignupModal from './SignupModal.jsx'
import ForgotPasswordModal from './ForgotPasswordModal.jsx'

export default function AuthModals() {
  const { modal } = useModal()
  if (!modal) return null
  return (
    <>
      {modal === 'login' && <LoginModal />}
      {modal === 'signup' && <SignupModal />}
      {modal === 'forgot' && <ForgotPasswordModal />}
    </>
  )
}