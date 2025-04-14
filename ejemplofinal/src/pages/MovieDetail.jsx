// src/pages/MovieDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_KEY = 'b83efaf1ac35dc9ac62e365e7cc8027a';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchMovieDetails();
    checkIfFavorite();
  }, [id]);

  // Fetch movie details from TMDB API
  const fetchMovieDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
      const data = await res.json();
      setMovie(data);

      // Fetch trailer for the movie
      const videoRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`);
      const videoData = await videoRes.json();
      const youtubeTrailer = videoData.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
      setTrailer(youtubeTrailer);

      // Fetch movie cast
      const creditsRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`);
      const creditsData = await creditsRes.json();
      setCast(creditsData.cast.slice(0, 5)); // Only the first 5 actors
    } catch (error) {
      console.error('Error al cargar detalles:', error);
    } finally {
      setLoading(false);
    }
  };

  // Check if movie is already in favorites from localStorage
  const checkIfFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.includes(id));
  };

  // Toggle favorite status and save to localStorage
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let updatedFavorites;

    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter(favId => favId !== id);
      setIsFavorite(false);
    } else {
      updatedFavorites = [...favorites, id];
      setIsFavorite(true);
    }

    // Save updated favorites to localStorage
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  if (loading) return <p>Cargando detalles...</p>;
  if (!movie) return <p>No se encontró la película.</p>;

  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="movie-detail">
      <div
        className="backdrop"
        style={{
          backgroundImage: `url(${backdropUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '4rem 2rem',
          color: 'white'
        }}
      >
        <Link to="/" style={{ color: '#0ff', fontSize: '18px' }}>← Volver</Link>
        <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
          <img
            src={posterUrl}
            alt={movie.title}
            style={{ width: '300px', borderRadius: '12px', boxShadow: '0 0 10px black' }}
          />
          <div>
            <h1>{movie.title}</h1>
            <button
              onClick={toggleFavorite}
              style={{
                backgroundColor: isFavorite ? '#e74c3c' : '#2ecc71',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                marginBottom: '1rem'
              }}
            >
              {isFavorite ? 'Quitar de Favoritos ❤️' : 'Agregar a Favoritos 🤍'}
            </button>
            <p><strong>Fecha de estreno:</strong> {movie.release_date}</p>
            <p><strong>Calificación:</strong> {movie.vote_average}</p>
            <p>{movie.overview}</p>

            {trailer && (
              <div style={{ marginTop: '1rem' }}>
                <h3>Tráiler</h3>
                <iframe
                  width="500"
                  height="280"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            {cast.length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <h3>Reparto principal</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {cast.map(actor => (
                    <li key={actor.id}>
                      {actor.name} como <em>{actor.character}</em>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
