import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">
        Home
      </Link>
      <Link to="/about" className="nav-link">
        About
      </Link>
      <Link to="/events" className="nav-link">
        Events
      </Link>
      <Link to="/gallery" className="nav-link">
        Gallery
      </Link>
      <Link to="/team" className="nav-link">
        Team
      </Link>
    </nav>
  );
};

export default Navbar;