import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminContentPage = () => {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (user?.role !== 'admin') {
      alert('Access denied');
      window.location.href = '/';
    }

    fetch('/api/movies')
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, [user]);

  const handleDelete = async (id) => {
    await fetch(`/api/movies/${id}`, { method: 'DELETE' });
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  return (
    <div>
      <h1>Admin Content Management</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.title}{' '}
            <button onClick={() => handleDelete(movie.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminContentPage;