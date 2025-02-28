import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import { getMovies, getSearchedMovies } from '../services/movie';

const MovieList = ({searchQuery, filters }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const { movies, total, limit } = await getMovies(page);

        if (page === 1) {
          setMovies(movies);
        } else {
          setMovies(prev => [...prev, ...movies]);
        }

        setHasMore(page * limit < total);
      } catch (error) {
        console.error('Failed to fetch movies', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);


  useEffect(() => {
    setPage(1);
    setMovies([]);
  }, [searchQuery, filters]);



  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const searchParams = {
          search: searchQuery,
          ...filters
        };

        const { movies, total, limit } = await getSearchedMovies(page, 12, searchParams);

        if (page === 1) {
          setMovies(movies);
        } else {
          setMovies(prev => [...prev, ...movies]);
        }

        setHasMore(page * limit < total);
      } catch (error) {
        console.error('Failed to fetch movies', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, searchQuery, filters]);


  if (!loading && movies.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-lg text-gray-600">
        No results were found for your search. Please change the search criteria.        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {loading && (
        <div className="text-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600 mx-auto"></div>
        </div>
      )}

      {hasMore && !loading && (
        <div className="text-center p-4">
          <button
            onClick={() => setPage(prev => prev + 1)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieList;