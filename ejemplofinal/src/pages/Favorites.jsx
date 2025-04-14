// src/pages/Favorites.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_KEY = 'b83efaf1ac35dc9ac62e365e7cc8027a';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Recuperar las películas favoritas de localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
    setLoading(false);
  }, []);

  if (loading) return <p>Cargando favoritos...</p>;
  if (favorites.length === 0) return <p>No tienes películas favoritas.</p>;

  return (
    <div className="favorites">
      <h1>Favoritos</h1>
      <div className="movie-grid">
        {favorites.map(id => (
          <MovieCard key={id} movieId={id} />
        ))}
      </div>
    </div>
  );
};

const MovieCard = ({ movieId }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
      const data = await res.json();
      setMovie(data);
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) return <p>Cargando película...</p>;

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img src={imageUrl} alt={movie.title} />
        <h3>{movie.title}</h3>
        <p>Calificación: {movie.vote_average}</p>
      </Link>
    </div>
  );
};

export default Favorites;

