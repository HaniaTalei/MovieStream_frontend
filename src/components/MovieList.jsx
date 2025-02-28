// // // import React from "react";
// // // import { Link } from "react-router-dom";

// // // const MovieList = ({ movies }) => {
// // //   return (
// // //     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // //       {movies.map((movie) => (
// // //         <div key={movie.id} className="border p-4 rounded">
// // //           <h2 className="text-xl font-bold">{movie.title}</h2>
// // //           <p>{movie.description}</p>
// // //           <p>Year: {movie.release_year}</p>
// // //           <p>Genre: {movie.genre}</p>
// // //           <Link to={`/movie/${movie.id}`} className="text-blue-500">
// // //             View Details
// // //           </Link>
// // //         </div>
// // //       ))}
// // //     </div>
// // //   );
// // // };

// // // export default MovieList;


// // import React from "react";
// // import { Link } from "react-router-dom";

// // const MovieList = ({ movies }) => {
// //   return (
// //     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //       {movies.map((movie) => (
// //         <div key={movie.id} className="border p-4 rounded">
// //           <h2 className="text-xl font-bold">{movie.title}</h2>
// //           <p>{movie.description}</p>
// //           <p>Year: {movie.release_year}</p>
// //           <p>Genre: {movie.genre}</p>
// //           <Link to={`/movie/${movie.id}`} className="text-blue-500">
// //             View Details
// //           </Link>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default MovieList;

// import React, { useState, useEffect } from 'react';
// import MovieCard from './MovieCard';
// import { getMovies } from '../services/movie';

// const MovieList = () => {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         setLoading(true);
//         const { movies, total, limit } = await getMovies(page);
        
//         if (page === 1) {
//           setMovies(movies);
//         } else {
//           setMovies(prev => [...prev, ...movies]);
//         }
        
//         setHasMore(page * limit < total);
//       } catch (error) {
//         console.error('Failed to fetch movies', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMovies();
//   }, [page]);

//   return (
//     <div>
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
//         {movies.map(movie => (
//           <MovieCard key={movie.id} movie={movie} />
//         ))}
//       </div>
      
//       {loading && (
//         <div className="text-center p-4">
//           <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600 mx-auto"></div>
//         </div>
//       )}
      
//       {hasMore && !loading && (
//         <div className="text-center p-4">
//           <button
//             onClick={() => setPage(prev => prev + 1)}
//             className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
//           >
//             Load More
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MovieList;

import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import { getMovies } from '../services/movie';

const MovieList = () => {
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