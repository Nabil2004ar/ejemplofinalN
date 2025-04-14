// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import Filter from '../components/Filter';
import MovieCard from '../components/MovieCard';

const API_KEY = 'b83efaf1ac35dc9ac62e365e7cc8027a'; // Tu clave API de TMDB
const MOVIE_API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch(MOVIE_API_URL);
      const data = await response.json();
      setMovies(data.results);
      setFilteredMovies(data.results); // Inicialmente todas las películas se muestran
    } catch (error) {
      console.error('Error al cargar las películas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (genreId) => {
    if (genreId === 'all') {
      setFilteredMovies(movies); // Mostrar todas las películas si no hay filtro
    } else {
      const filtered = movies.filter(movie =>
        movie.genre_ids.includes(parseInt(genreId))
      );
      setFilteredMovies(filtered); // Filtrar por género
    }
  };

  if (loading) return <p>Cargando películas...</p>;

  return (
    <div className="home">
      <h2>Catálogo de Películas</h2>
      <Filter onFilter={handleFilter} />
      <div className="movie-grid">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;



