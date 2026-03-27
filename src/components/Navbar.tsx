import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../hooks/useAuth";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAdmin } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    signOut(auth);
  };

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
          <Link
            to="/tournament"
            className={`nav-link ${isActive("/tournament") ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            <span className="nav-icon">🏆</span> Tournament
          </Link>
          <Link
            to="/army-builder"
            className={`nav-link ${isActive("/army-builder") ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            <span className="nav-icon">🛠️</span> Army Builder
          </Link>
          <Link
            to="/factions"
            className={`nav-link ${isActive("/factions") ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            <span className="nav-icon">⚔️</span> Factions
          </Link>
          <div className="nav-auth">
            {isAdmin && <Link to="/admin" className="admin-badge" onClick={() => setMenuOpen(false)}>ADMIN</Link>}
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
