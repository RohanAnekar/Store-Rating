import React, { useEffect, useState } from 'react';
import api from '../api/axios';

function UserList() {
  const [filters, setFilters] = useState({ name: '', email: '', address: '', role: '' });
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const params = new URLSearchParams(filters).toString();
    const res = await api.get(`/admin/users?${params}`);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  return (
    <div className="my-4">
      <h4>All Users</h4>
      <form className="row g-2 mb-3" onSubmit={handleSearch}>
        <div className="col-md-3">
          <input className="form-control" name="name" placeholder="Name" value={filters.name} onChange={handleChange} />
        </div>
        <div className="col-md-3">
          <input className="form-control" name="email" placeholder="Email" value={filters.email} onChange={handleChange} />
        </div>
        <div className="col-md-3">
          <input className="form-control" name="address" placeholder="Address" value={filters.address} onChange={handleChange} />
        </div>
        <div className="col-md-2">
          <select className="form-select" name="role" value={filters.role} onChange={handleChange}>
            <option value="">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="store-owner">Store Owner</option>
          </select>
        </div>
        <div className="col-md-1">
          <button className="btn btn-primary w-100" type="submit">Search</button>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.role}</td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr><td colSpan="4">No users found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
