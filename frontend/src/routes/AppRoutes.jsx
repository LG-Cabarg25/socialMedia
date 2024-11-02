import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import Dashboard from '../pages/Dashboard';
import ProfilePage from '../pages/Profile';
import ProtectedRoute from './ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <ProfilePage /> {/* Nueva ruta protegida para el perfil */}
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}

export default AppRoutes;
