import { Link } from 'react-router-dom'; 
import { FaSearch } from 'react-icons/fa';

import loginLg from './assets/loginlg.png'; 
import loginImage from './assets/loginimage.png';



const Navbar = () => {
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

      <div className="nav-search">
        <input type="text" placeholder="Search..." />
        <button>
          <FaSearch /> 
        </button>
      </div>
    </nav>
  );
};

export default Navbar;