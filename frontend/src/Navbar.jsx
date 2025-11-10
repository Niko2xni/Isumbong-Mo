import { Link, useNavigate } from 'react-router-dom'; 
import { FaSearch, FaUser } from 'react-icons/fa';
import { useAuth } from './context/AuthContext';

import loginLg from './assets/loginlg.png'; 

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={loginLg} alt="Logo" className="logo" />
        <Link to="/" className="nav-item">Home</Link> 
        <Link to="/bulletin" className="nav-item">Bulletin</Link>
        <Link to="/about" className="nav-item">About</Link>
        <Link to="/dashboard" className="nav-item">Dashboard</Link>
        <Link to="/contact" className="nav-item">Contact</Link>
      </div>

      <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div className="nav-search">
          <input type="text" placeholder="Search..." />
          <button>
            <FaSearch /> 
          </button>
        </div>
        
        {isAuthenticated ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link to="/dashboard" className="nav-item" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <FaUser />
              <span>{user?.first_name} {user?.last_name}</span>
            </Link>
            <button onClick={handleLogout} className="nav-item" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontSize: 'inherit' }}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="nav-item">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;