import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${movie.id}`} className="block">
      <div className="bg-gray-800 rounded overflow-hidden transition-transform hover:scale-105">
        <img 
          src={movie.poster_url || '/placeholder-poster.jpg'} 
          alt={movie.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-white font-bold truncate">{movie.title}</h3>
          <p className="text-gray-400 text-sm">{movie.release_year}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;