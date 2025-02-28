import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { getWatchlist, removeFromWatchlist } from '../services/watchlist'; // مسیر را تنظیم کنید
import './styles/watchlist.css';

const WatchlistPage = () => {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!localStorage.getItem('token')) {
        setError('No authentication token found. Please log in again.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching watchlist...");
        
        const data = await getWatchlist();
        console.log("Watchlist data received:", data);
        setWatchlist(data);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
        setError('Failed to load watchlist. Please check console for details.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchWatchlist();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleRemoveFromWatchlist = async (movieId) => {
    try {
      setError(null);
      await removeFromWatchlist(movieId);
      setWatchlist(prevWatchlist => prevWatchlist.filter(movie => movie.id !== movieId));
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      setError('Failed to remove item from watchlist. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (!user) {
    return (
      <div className="watchlist-page">
        <Navbar />
        <div className="watchlist-container">
          <div className="not-logged-in">
            <h2>Please log in to view your watchlist</h2>
            <button 
              className="login-btn" 
              onClick={() => window.location.href = '/login'}
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="watchlist-page">
      <Navbar />
      <div className="watchlist-container">
        <div className="watchlist-header">
          <h1>My Watchlist</h1>
          <p>Keep track of movies and shows you want to watch</p>
        </div>

        {error && (
          <div className="error-message" style={{ 
            color: 'white', 
            backgroundColor: '#f44336', 
            padding: '10px', 
            borderRadius: '4px',
            marginBottom: '20px'
          }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading your watchlist...</p>
          </div>
        ) : watchlist && watchlist.length > 0 ? (
          <>
            <div className="watchlist-stats">
              <p>Total items: <span>{watchlist.length}</span></p>
              <p>Average rating: <span>{(watchlist.reduce((sum, movie) => sum + (movie.rating || 0), 0) / watchlist.length).toFixed(1)}</span></p>
            </div>
            
            <div className="watchlist-table-container">
              <table className="watchlist-table">
                <thead>
                  <tr>
                    <th>Poster</th>
                    <th>Title</th>
                    <th>Year</th>
                    <th>Genre</th>
                    <th>Rating</th>
                    <th>Added On</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {watchlist.map(movie => (
                    <tr key={movie.id}>
                      <td className="poster-cell">
                        <img 
                          src={movie.poster || '/default-poster.jpg'} 
                          alt={`${movie.title} poster`}
                          onError={(e) => {e.target.src = '/default-poster.jpg'}}
                        />
                      </td>
                      <td>{movie.title}</td>
                      <td>{movie.year}</td>
                      <td>{movie.genre}</td>
                      <td>
                        <div className="rating">
                          <span className="rating-star">★</span> {movie.rating || 'N/A'}
                        </div>
                      </td>
                      <td>{movie.addedOn ? formatDate(movie.addedOn) : 'N/A'}</td>
                      <td>
                        <button 
                          className="remove-btn"
                          onClick={() => handleRemoveFromWatchlist(movie.id)}
                        >
                          Remove
                        </button>
                        <button className="watch-btn">Watch Now</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="watchlist-grid">
              {watchlist.map(movie => (
                <div key={movie.id} className="watchlist-card">
                  <div className="card-poster">
                    <img 
                      src={movie.poster || '/default-poster.jpg'} 
                      alt={`${movie.title} poster`}
                      onError={(e) => {e.target.src = '/default-poster.jpg'}}
                    />
                    <div className="card-overlay">
                      <button className="watch-btn">Watch Now</button>
                      <button 
                        className="remove-btn"
                        onClick={() => handleRemoveFromWatchlist(movie.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="card-info">
                    <h3>{movie.title}</h3>
                    <div className="card-details">
                      <span>{movie.year}</span>
                      <span className="rating">
                        <span className="rating-star">★</span> {movie.rating || 'N/A'}
                      </span>
                    </div>
                    <p className="card-genre">{movie.genre}</p>
                    <p className="card-added">Added: {movie.addedOn ? formatDate(movie.addedOn) : 'N/A'}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="empty-watchlist">
            <div className="empty-icon">📋</div>
            <h2>Your watchlist is empty</h2>
            <p>Browse movies and TV shows and add them to your watchlist to keep track of what you want to watch.</p>
            <button className="browse-btn" onClick={() => window.location.href = '/'}>
              Browse Movies
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchlistPage;