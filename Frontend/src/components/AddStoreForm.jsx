import React, { useEffect, useState } from 'react';
import api from '../api/axios';

function AddStoreForm() {
  const [form, setForm] = useState({ name: '', address: '', ownerId: '' });
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    const fetchOwners = async () => {
      const res = await api.get('/admin/users?role=store-owner'); // you may need to implement this
      setOwners(res.data);
    };
    fetchOwners();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/create-store', {
        ...form,
        ownerId: Number(form.ownerId),
      });
      alert('Store created successfully');
      setForm({ name: '', address: '', ownerId: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to create store');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h4>Add New Store</h4>
      <div className="row">
        <div className="col-md-5 mb-2">
          <input name="name" value={form.name} onChange={handleChange} className="form-control" placeholder="Store Name" required />
        </div>
        <div className="col-md-5 mb-2">
          <input name="address" value={form.address} onChange={handleChange} className="form-control" placeholder="Store Address" />
        </div>
        <div className="col-md-5 mb-3">
          <select name="ownerId" value={form.ownerId} onChange={handleChange} className="form-select" required>
            <option value="">Select Store Owner</option>
            {owners.map(owner => (
              <option key={owner.id} value={owner.id}>
                {owner.name} ({owner.email})
              </option>
            ))}
          </select>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Create Store</button>
    </form>
  );
}

export default AddStoreForm;
