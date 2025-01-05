// src/components/ui/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
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

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    color: #00B4D8;
  }
`;

function Navbar() {
  return (
    <NavContainer>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/events">Events</NavLink>
      <NavLink to="/gallery">Gallery</NavLink>
      <NavLink to="/team">Team</NavLink>
    </NavContainer>
  );
}

export default Navbar;