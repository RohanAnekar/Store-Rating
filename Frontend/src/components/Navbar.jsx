import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="bg-dark text-white w-100" style={{ height: '60px' }}>
      <div className="d-flex justify-content-between align-items-center h-100 px-4">
        <div className="d-flex align-items-center">
          <Link to="/" className="text-white fw-bold text-decoration-none me-3">
            Home
          </Link>
        </div>
        <div className="d-flex align-items-center">
          {!user ? (
            <>
              <Link to="/login" className="btn btn-outline-light me-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-outline-light">
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="me-3">Welcome, {user.name} ({user.role})</span>
              <button onClick={handleLogout} className="btn btn-light">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
