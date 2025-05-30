
import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const UserDashboard = () => {
  const [stores, setStores] = useState([]);

  const fetchStores = async () => {
    const res = await api.get('/user/stores');
    setStores(res.data);
  };

  const handleRating = async (storeId, e) => {
    const value = Number(e.target.value);
    if (!value) return alert('Please select a valid rating');
    await api.post('/user/submit-rating', { storeId, value });
    alert('Rating submitted!');
    fetchStores();
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <div className="flex-grow-1 d-flex flex-column justify-content-start align-items-stretch p-4">
        <div className="bg-white w-100 p-5 rounded shadow">
          <h2 className="text-center mb-4 display-4 fw-bold text-primary">
            User Dashboard
          </h2>

          <div className="table-responsive">
            <table className="table table-bordered table-hover text-center w-100">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Average Rating</th>
                  <th>Your Rating</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {stores.map((store) => (
                  <tr key={store.id}>
                    <td>{store.name}</td>
                    <td>{store.address}</td>
                    <td>{store.avgRating || 'N/A'}</td>
                    <td>{store.userRating || 'N/A'}</td>
                    <td>
                      <select
                        className="form-select"
                        defaultValue={store.userRating || ''}
                        onChange={(e) => handleRating(store.id, e)}
                      >
                        <option value="">Rate</option>
                        {[1, 2, 3, 4, 5].map((val) => (
                          <option key={val} value={val}>
                            {val}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
                {stores.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-muted">
                      No stores available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
