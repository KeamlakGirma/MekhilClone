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

import AdminShell from './components/admin/AdminShell.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminUsers from './pages/admin/AdminUsers.jsx'
import AdminEnrollments from './pages/admin/AdminEnrollments.jsx'
import AdminPayments from './pages/admin/AdminPayments.jsx'
import AdminReports from './pages/admin/AdminReports.jsx'
import AdminCoupons from './pages/admin/AdminCoupons.jsx'
import AdminBundles from './pages/admin/AdminBundles.jsx'
import { useLocation } from 'react-router-dom'


export default function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')
  
  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && <Header />}
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
          <Route path="/admin" element={<AdminShell />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="enrollments" element={<AdminEnrollments />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="coupons" element={<AdminCoupons />} />
            <Route path="bundles" element={<AdminBundles />} />
          </Route>
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      <AuthModals />
    </div>
  )
}