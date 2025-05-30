import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import AddUserForm from '../components/AddUserForm';
import AddStoreForm from '../components/AddStoreForm';
import UserList from '../components/UserList'; // ✅ Add this import
import StoreList from '../components/StoreList';

function AdminDashboard() {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });
 

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await api.get('/admin/metrics');
        setMetrics(res.data);
      } catch (err) {
        console.error('Failed to load metrics:', err);
      }
    };

    fetchMetrics();
  }, []);
 

  return (
    <div className="container py-5">
      <h1 className="mb-4">Admin Dashboard</h1>

      {/* Metrics section */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card shadow text-center">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <h2 className="text-primary">{metrics.totalUsers}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow text-center">
            <div className="card-body">
              <h5 className="card-title">Total Stores</h5>
              <h2 className="text-success">{metrics.totalStores}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow text-center">
            <div className="card-body">
              <h5 className="card-title">Total Ratings</h5>
              <h2 className="text-danger">{metrics.totalRatings}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Add user/store forms */}
      <AddUserForm />
      <AddStoreForm />

      {/* User list with filters */}
      <UserList />
      <StoreList />
    </div>
  );
}

export default AdminDashboard;
