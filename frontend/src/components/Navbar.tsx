import React, { useState, CSSProperties } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const styles: { [key: string]: CSSProperties } = {
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    backgroundColor: '#0f172a', // dark blue-gray
    color: '#ffffff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  leftSection: {
    display: 'flex',
    gap: '1.5rem',
    flex: 1,
  },
  centerSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  rightSection: {
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 1,
    position: 'relative',
  },
  link: {
    color: '#ffffff',
    textDecoration: 'none',
    transition: 'color 0.3s',
  },
  linkHover: {
    color: '#60a5fa',
  },
  dropdown: {
    position: 'absolute',
    top: '2.5rem',
    right: 0,
    backgroundColor: '#1e293b',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
  },
  button: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 500,
  },
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      {/* Left */}
      <div style={styles.leftSection}>
        <Link to="/" style={styles.link}>Home</Link>
        {user && <Link to="/create" style={styles.link}>Create Blog</Link>}
        {user && <Link to="/my-blogs" style={styles.link}>My Blogs</Link>}
      </div>

      {/* Center */}
      <div style={styles.centerSection}>
        <Link to="/" style={{ ...styles.link, fontWeight: 'bold', fontSize: '1.5rem' }}>Inkpost</Link>
      </div>

      {/* Right */}
      <div style={styles.rightSection}>
        {user ? (
          <div>
            <button
              style={styles.button}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {user.name}
            </button>
            {showDropdown && (
              <div style={styles.dropdown}>
                <button
                  onClick={handleLogout}
                  style={{ ...styles.button, padding: '0.5rem 0', color: '#f87171' }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={{ ...styles.link, marginLeft: '1rem' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
