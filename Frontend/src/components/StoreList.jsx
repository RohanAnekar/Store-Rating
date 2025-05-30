import React, { useEffect, useState } from 'react';
import api from '../api/axios';

function StoreList() {
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({ name: '', address: '' });

  const fetchStores = async () => {
    const params = new URLSearchParams(filters).toString();
    const res = await api.get(`/admin/stores?${params}`);
    setStores(res.data);
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStores();
  };

  return (
    <div className="my-4">
      <h4>All Stores</h4>
      <form className="row g-2 mb-3" onSubmit={handleSearch}>
        <div className="col-md-4">
          <input className="form-control" name="name" placeholder="Store Name" value={filters.name} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <input className="form-control" name="address" placeholder="Address" value={filters.address} onChange={handleChange} />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" type="submit">Search</button>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Owner Name</th>
              <th>Owner Email</th>
              <th>Average Rating</th>
            </tr>
          </thead>
          <tbody>
            {stores.map(store => (
              <tr key={store.id}>
                <td>{store.name}</td>
                <td>{store.address}</td>
                <td>{store.ownerName}</td>
                <td>{store.ownerEmail}</td>
                <td>{store.avgRating}</td>
              </tr>
            ))}
            {stores.length === 0 && (
              <tr><td colSpan="5">No stores found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StoreList;
