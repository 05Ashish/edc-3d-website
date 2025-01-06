// src/components/ui/Navbar.jsx
import React from 'react';
import styled from 'styled-components';

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  background-color: #000;
  padding: 1rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

const NavLink = styled.button`
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 1rem;
  &:hover {
    color: #00B4D8;
  }
`;

const SECTIONS = {
  HOME: 'home',
  ABOUT: 'about',
  EVENTS: 'events',
  GALLERY: 'gallery',
  TEAM: 'team'
};

function Navbar({ onSectionChange }) {
  // Add debug logging
  const handleClick = (section) => {
    console.log('Navbar clicking:', section);
    onSectionChange(section);
  };

  return (
    <NavContainer>
      <NavLink onClick={() => handleClick(SECTIONS.HOME)}>Home</NavLink>
      <NavLink onClick={() => handleClick(SECTIONS.ABOUT)}>About</NavLink>
      <NavLink onClick={() => handleClick(SECTIONS.EVENTS)}>Events</NavLink>
      <NavLink onClick={() => handleClick(SECTIONS.GALLERY)}>Gallery</NavLink>
      <NavLink onClick={() => handleClick(SECTIONS.TEAM)}>Team</NavLink>
    </NavContainer>
  );
}

export default Navbar;