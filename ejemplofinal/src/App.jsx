// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';  // Asegúrate de importar 'Link'
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Favorites from './pages/Favorites'; // Importar el componente de favoritos
import Contact from './pages/Contact';
import Footer from './components/Footer'; // importar
import Header from './components/Header'; // ✅ importar header


const App = () => {
  return (
    <Router>
      {/* Barra de navegación para ir a la página de favoritos */}
      <nav style={{ padding: '10px', backgroundColor: '#333', color: 'white' }}>
        <Link to="/" style={{ margin: '0 10px', color: 'white' }}>Home</Link>
        <Link to="/favorites" style={{ margin: '0 10px', color: 'white' }}>Ver Favoritos</Link>
      </nav>
      
      {/* Definición de las rutas */}
      <Header /> {/* ✅ mostrarlo aquí */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/favorites" element={<Favorites />} /> {/* Ruta para favoritos */}
        <Route path="/contact" element={<Contact />} /> {/* Ruta de contacto */}
      </Routes>
      <Footer /> {/* Insertar footer aquí */}
    </Router>
  );
};

export default App;
