import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Globe, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

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
          <span>GoEase India</span>
        </Link>
        
        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={closeMenu}>{t('nav.home')}</Link>
          <Link to="/documents" className={`nav-link ${isActive('/documents') ? 'active' : ''}`} onClick={closeMenu}>{t('nav.documents')}</Link>
          <Link to="/help" className={`nav-link ${isActive('/help') ? 'active' : ''}`} onClick={closeMenu}>{t('nav.help')}</Link>
          <Link to="/feedback" className={`nav-link ${isActive('/feedback') ? 'active' : ''}`} onClick={closeMenu}>{t('nav.feedback')}</Link>
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
          <button className="lang-toggle" onClick={toggleLanguage} aria-label="Toggle Language" id="lang-toggle-btn">
            <Globe size={18} />
            {language}
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen(prev => !prev)} aria-label="Toggle Menu" id="menu-toggle-btn">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};
