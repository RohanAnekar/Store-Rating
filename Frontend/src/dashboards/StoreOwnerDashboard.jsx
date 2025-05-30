import { useEffect, useState } from 'react';
import api from '../api/axios';
import '../styles/dashboard.css';

function StoreOwnerDashboard() {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await api.get('/store-owner/ratings');
        setRatings(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRatings();
  }, []);

  return (
    <div className="dashboard">
      <h2>Store Owner Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {ratings.map((r, index) => (
            <tr key={index}>
              <td>{r.userName}</td>
              <td>{r.email}</td>
              <td>{r.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StoreOwnerDashboard;
