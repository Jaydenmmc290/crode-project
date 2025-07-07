// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">CRODE</Link>
      </div>
      <div className="navbar-right">
        <Link to="/">Dashboard</Link>
        <Link to="/opportunities">Opportunities</Link>
        {token && <Link to="/add">Add Post</Link>}
        {token && <Link to="/profile">Hi, {username}</Link>}
        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/signup">Sign Up</Link>}
        {token && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
