import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Dropdown from './Dropdown';
import logoImage from '../assets/Sujata.jpg';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sanctuariesItems = [
    { title: 'The Hair Sanctuary', path: '/hair-sanctuary' },
    { title: 'The Skin & Soul Studio', path: '/skin-and-soul' },
  ];

  const academyItems = [
    { title: 'Our Courses', path: '/courses' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src={logoImage} alt="Moneri Spa & Academy Logo" />
        <div className="brand-text-container">
          <span className="brand-main-name">Moneri</span>
          <span className="brand-sub-name">Spa & Academy</span>
        </div>
      </Link>
      
      <button 
        className="mobile-menu-toggle" 
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        ☰
      </button>
      
      <ul className={`navbar-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <li><NavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink></li>
        <li className="nav-item"><span>Our Sanctuaries</span><Dropdown items={sanctuariesItems} /></li>
        <li className="nav-item"><span>The Academy</span><Dropdown items={academyItems} /></li>
        <li><NavLink to="/gallery" onClick={() => setIsMobileMenuOpen(false)}>Gallery</NavLink></li>
        <li><NavLink to="/beauty-journal" onClick={() => setIsMobileMenuOpen(false)}>Beauty Journal</NavLink></li>
        <li><NavLink to="/our-story" onClick={() => setIsMobileMenuOpen(false)}>Our Story</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;