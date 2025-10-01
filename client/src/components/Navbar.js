import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Dropdown from './Dropdown';
import logoImage from '../assets/Sujata.jpg';

const Navbar = () => {
  const sanctuariesItems = [
    { title: 'The Hair Sanctuary', path: '/hair-sanctuary' },
    { title: 'The Skin & Soul Studio', path: '/skin-and-soul' },
  ];

  const academyItems = [
    { title: 'Our Courses', path: '/courses' },
  ];

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src={logoImage} alt="Moneri Spa & Academy Logo" />
        <div className="brand-text-container">
          <span className="brand-main-name">Moneri</span>
          <span className="brand-sub-name">Spa & Academy</span>
        </div>
      </Link>
      
      <ul className="navbar-links">
        <li><NavLink to="/">Home</NavLink></li>
        <li className="nav-item"><span>Our Sanctuaries</span><Dropdown items={sanctuariesItems} /></li>
        <li className="nav-item"><span>The Academy</span><Dropdown items={academyItems} /></li>
        <li><NavLink to="/gallery">Gallery</NavLink></li>
        <li><NavLink to="/beauty-journal">Beauty Journal</NavLink></li>
        <li><NavLink to="/our-story">Our Story</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;