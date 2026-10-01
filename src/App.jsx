import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import AuthModals from './components/modals/AuthModals.jsx'

import HomePage from './pages/HomePage.jsx'
import CoursesPage from './pages/CoursesPage.jsx'
import CourseSalesPage from './pages/CourseSalesPage.jsx'
import MasterclassPage from './pages/MasterclassPage.jsx'
import BusinessDirectoryPage from './pages/BusinessDirectoryPage.jsx'
import OpportunitiesPage from './pages/OpportunitiesPage.jsx'
import CommunityPage from './pages/CommunityPage.jsx'
import PathPlayerPage from './pages/PathPlayerPage.jsx'
import PaymentPage from './pages/PaymentPage.jsx'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/course/:slug" element={<CourseSalesPage />} />
          <Route path="/masterclass" element={<MasterclassPage />} />
          <Route path="/business-directory" element={<BusinessDirectoryPage />} />
          <Route path="/opportunities" element={<OpportunitiesPage />} />
          <Route path="/social" element={<CommunityPage />} />
          <Route path="/path-player" element={<PathPlayerPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>
      <Footer />
      <AuthModals />
    </div>
  )
}