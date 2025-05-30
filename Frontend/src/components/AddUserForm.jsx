import React, { useState } from 'react';
import api from '../api/axios';

function AddUserForm({ onUserCreated }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    role: 'user',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/create-user', form);
      alert('User created successfully');
      setForm({ name: '', email: '', password: '', address: '', role: 'user' });
      if (onUserCreated) onUserCreated();
    } catch (err) {
      alert('Failed to create user');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h4>Add New User</h4>
      <div className="row">
        <div className="col-md-6 mb-2">
          <input name="name" value={form.name} onChange={handleChange} className="form-control" placeholder="Name" required />
        </div>
        <div className="col-md-6 mb-2">
          <input name="email" type="email" value={form.email} onChange={handleChange} className="form-control" placeholder="Email" required />
        </div>
        <div className="col-md-6 mb-2">
          <input name="password" type="password" value={form.password} onChange={handleChange} className="form-control" placeholder="Password" required />
        </div>
        <div className="col-md-6 mb-2">
          <input name="address" value={form.address} onChange={handleChange} className="form-control" placeholder="Address" />
        </div>
        <div className="col-md-6 mb-3">
          <select name="role" value={form.role} onChange={handleChange} className="form-select">
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="store-owner">Store Owner</option>
          </select>
        </div>
      </div>
      <button type="submit" className="btn btn-success">Create User</button>
    </form>
  );
}

export default AddUserForm;
