import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Globe, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const toggleLang = () => {
    setLang(prev => prev === 'EN' ? 'HI' : 'EN');
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar" id="main-nav">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <ShieldCheck size={28} />
          <span>GovEase India</span>
        </Link>
        
        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={closeMenu}>Home</Link>
          <Link to="/documents" className={`nav-link ${isActive('/documents') ? 'active' : ''}`} onClick={closeMenu}>Documents</Link>
          <Link to="/status" className={`nav-link ${isActive('/status') ? 'active' : ''}`} onClick={closeMenu}>Status Tracker</Link>
          <Link to="/guides" className={`nav-link ${isActive('/guides') ? 'active' : ''}`} onClick={closeMenu}>Guides</Link>
          <Link to="/help" className={`nav-link ${isActive('/help') ? 'active' : ''}`} onClick={closeMenu}>Help &amp; FAQ</Link>
          <Link to="/feedback" className={`nav-link ${isActive('/feedback') ? 'active' : ''}`} onClick={closeMenu}>Feedback</Link>
        </div>

        <div className="navbar-right">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            title={theme === 'light' ? 'Dark mode' : 'Light mode'}
            id="theme-toggle-btn"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button className="lang-toggle" onClick={toggleLang} aria-label="Toggle Language" id="lang-toggle-btn">
            <Globe size={18} />
            {lang}
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen(prev => !prev)} aria-label="Toggle Menu" id="menu-toggle-btn">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};
