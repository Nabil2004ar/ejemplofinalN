import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{
      width: '100%',
      padding: '20px',
      backgroundColor: '#141414',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 10,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h1 style={{ color: '#e50914' }}>
        <Link to="/" style={{ color: '#e50914', textDecoration: 'none' }}>NEFFEX</Link>
      </h1>

      <nav style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Inicio</Link>
        <Link to="/favorites" style={{ color: 'white', textDecoration: 'none' }}>Favoritos</Link>
        <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contacto</Link>
      </nav>
    </header>
  );
};

export default Header;
