import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import AdminDashboard from '../dashboards/AdminDashboard'; // ✅ correct spelling
import UserDashboard from '../dashboards/UserDashboard';
import StoreOwnerDashboard from '../dashboards/StoreOwnerDashboard';
import Home from '../pages/Home';
import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from '../components/Navbar';

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Role-based routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/store-owner-dashboard"
          element={
            <ProtectedRoute allowedRoles={['store-owner']}>
              <StoreOwnerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
