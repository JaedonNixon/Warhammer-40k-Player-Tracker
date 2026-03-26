import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">⚔️</span>
          <span className="brand-text">HAM TRACKER</span>
          <span className="brand-subtitle">40K Battle Tracker</span>
        </Link>

        <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="toggle-bar" />
          <span className="toggle-bar" />
          <span className="toggle-bar" />
        </button>

        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <Link
            to="/"
            className={`nav-link ${isActive("/") ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            <span className="nav-icon">🏠</span> Home
          </Link>
          <Link
            to="/players"
            className={`nav-link ${isActive("/players") ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            <span className="nav-icon">👥</span> Players
          </Link>
          <Link
            to="/history"
            className={`nav-link ${isActive("/history") ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            <span className="nav-icon">📜</span> History
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
