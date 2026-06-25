import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute, AdminRoute, GuestRoute } from './components/ProtectedRoute';
import Loader from './components/Loader';

// Public Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ServicesPage from './pages/ServicesPage';
import ActualitesPage from './pages/ActualitesPage';
import DemarchesPage from './pages/DemarchesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ActeCivilPage from './pages/ActeCivilPage';
import ServicesPublics from './pages/ServicesPublics';

// Citizen Pages
import DashboardCitoyen from './pages/DashboardCitoyen';
import MesDemandes from './pages/MesDemandes';
import DetailDemande from './pages/DetailDemande';
import NouvelleDemande from './pages/NouvelleDemande';
import ReclamationsPage from './pages/ReclamationsPage';
import ProfilePage from './pages/ProfilePage';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation of initial loading
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPublics />} />
          <Route path="/actualites" element={<ActualitesPage />} />
          <Route path="/demarches" element={<DemarchesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/demande/acte-civil" element={<ActeCivilPage />} />
          <Route path="/services-publics" element={<ServicesPublics />} />

          {/* Guest Only Routes (Login/Register) */}
          <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
          <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />

          {/* Citizen Routes */}
          <Route path="/dashboard" element={<PrivateRoute><DashboardCitoyen /></PrivateRoute>} />
          <Route path="/mes-demandes" element={<PrivateRoute><MesDemandes /></PrivateRoute>} />
          <Route path="/demande/:id" element={<PrivateRoute><DetailDemande /></PrivateRoute>} />
          <Route path="/nouvelle-demande" element={<PrivateRoute><NouvelleDemande /></PrivateRoute>} />
          <Route path="/reclamations" element={<PrivateRoute><ReclamationsPage /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard tab="overview" /></AdminRoute>} />
          <Route path="/admin/demandes" element={<AdminRoute><AdminDashboard tab="demandes" /></AdminRoute>} />
          <Route path="/admin/services" element={<AdminRoute><AdminDashboard tab="services" /></AdminRoute>} />
          <Route path="/admin/annonces" element={<AdminRoute><AdminDashboard tab="news" /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><AdminDashboard tab="users" /></AdminRoute>} />
          <Route path="/admin/gallery" element={<AdminRoute><AdminDashboard tab="gallery" /></AdminRoute>} />
          <Route path="/admin/settings" element={<AdminRoute><AdminDashboard tab="settings" /></AdminRoute>} />
          <Route path="/admin/stats" element={<AdminRoute><AdminDashboard tab="stats" /></AdminRoute>} />

          {/* Redirects */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
