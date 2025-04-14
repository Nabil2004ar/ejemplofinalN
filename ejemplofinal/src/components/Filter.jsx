// src/components/Filter.jsx
import React, { useState, useEffect } from 'react';

const API_KEY = 'b83efaf1ac35dc9ac62e365e7cc8027a'; // Reemplaza con tu clave de API
const GENRE_API_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;

const Filter = ({ onFilter }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await fetch(GENRE_API_URL);
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error('Error al obtener los géneros:', error);
    }
  };

  return (
    <div className="filter">
      <select onChange={(e) => onFilter(e.target.value)}>
        <option value="all">Todos</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;

