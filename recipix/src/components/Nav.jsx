import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Nav.css';
import logo from '../images/logo.png';

function Nav({ setSearch }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchInput, setSearchInput] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    setSearch(value); // update search in parent

    // Automatically navigate to Menu page if not there
    if (location.pathname !== '/recipes') {
      navigate('/recipes');
    }
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSearch(''); // show all cards again
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          <img src={logo} alt="Logo" className="logo" />
          <span className="brand-name"></span>
        </Link>
      </div>

      <ul className="nav-menu">
        <li className={location.pathname === '/' ? 'active' : ''}><Link to="/">Home</Link></li>
        <li className={location.pathname.startsWith('/recipes') ? 'active' : ''}><Link to="/recipes">Menu</Link></li>
        <li className={location.pathname === '/reviews' ? 'active' : ''}><Link to="/reviews">Reviews</Link></li>
        <li className={location.pathname === '/services' ? 'active' : ''}><Link to="/services">Services</Link></li>
      </ul>

      <div className="nav-search">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchInput}
            onChange={handleSearchChange}
          />
          {searchInput && (
            <span className="clear-btn" onClick={handleClearSearch}>✖</span>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
