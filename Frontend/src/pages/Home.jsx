import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container text-center mt-5">
      <div className="p-5 bg-light rounded shadow">
        <h1 className="display-4 mb-4 text-primary">Welcome to Store Rating App</h1>
        <p className="lead mb-3">
          Rate stores, explore feedback, and view statistics all in one place.
        </p>
        <p className="mb-4">Login or Register to get started as a User or Admin.</p>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/login" className="btn btn-outline-primary btn-lg">
            User Login
          </Link>
          <Link to="/register" className="btn btn-outline-success btn-lg">
            User Register
          </Link>
          <Link to="/admin-login" className="btn btn-outline-info btn-lg">
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
