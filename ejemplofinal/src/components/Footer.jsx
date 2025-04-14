import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: '#111', 
      color: '#999', 
      padding: '2rem', 
      textAlign: 'center',
      marginTop: '2rem'
    }}>
      <p>© {new Date().getFullYear()} NEFFEX. Todos los derechos reservados.</p>
      <p>
        <a href="/contact" style={{ color: '#e50914' }}>Contacto</a>
      </p>
    </footer>
  );
};

export default Footer;
