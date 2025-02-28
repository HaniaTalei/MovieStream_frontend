import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  getMovie, 
  getMovieComments, 
  addComment, 
  getMovieRating,
  getUserMovieRating,
  rateMovie,
  deleteRating
} from '../services/movie';
import './styles/movie.css';

import { useAuth } from '../context/AuthContext';

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const { isAuthenticated, user } = useAuth();
  
  // State variables
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Comments state
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  
  // Rating state
  const [movieRating, setMovieRating] = useState({ averageRating: 0, ratingCount: 0 });
  const [userRating, setUserRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(0);
  const [submittingRating, setSubmittingRating] = useState(false);



  


  // Fetch movie details
  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);
        const movieData = await getMovie(movieId);
        setMovie(movieData);
        
        try {
          // Load comments
          const commentsData = await getMovieComments(movieId);
          setComments(commentsData || []);
        } catch (commentErr) {
          console.error('Error loading comments:', commentErr);
          setComments([]);
        }
        
        try {
          // Load rating info
          const ratingData = await getMovieRating(movieId);
          setMovieRating(ratingData || { averageRating: 0, ratingCount: 0 });
        } catch (ratingErr) {
          console.error('Error loading movie rating:', ratingErr);
        }
        
        if (isAuthenticated) {
          try {
            const userRatingData = await getUserMovieRating(movieId);
            if (userRatingData && userRatingData.rated) {
              setUserRating(userRatingData.rating.rating);
            }
          } catch (userRatingErr) {
            console.error('Error loading user rating:', userRatingErr);
          }
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error loading movie:', err);
        setError(`Error loading movie data: ${err.message || 'Unknown error'}`);
        setLoading(false);
      }
    };
    
    if (movieId) {
      loadMovie();
    } else {
      setError('Invalid movie ID');
      setLoading(false);
    }
  }, [movieId, isAuthenticated]);

  // Handle comment submission
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !isAuthenticated) return;
    
    try {
      setSubmittingComment(true);
      const addedComment = await addComment(movieId, newComment);
      setComments(prev => [...prev, addedComment]);
      setNewComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
      alert('Failed to add comment. Please try again.');
    } finally {
      setSubmittingComment(false);
    }
  };

  // Handle rating submission
  const handleRateMovie = async (rating) => {
    if (!isAuthenticated) return;
    
    try {
      setSubmittingRating(true);
      await rateMovie(movieId, rating);
      setUserRating(rating);
      
      const ratingData = await getMovieRating(movieId);
      setMovieRating(ratingData || { averageRating: 0, ratingCount: 0 });
    } catch (err) {
      console.error('Error rating movie:', err);
      alert('Failed to rate movie. Please try again.');
    } finally {
      setSubmittingRating(false);
    }
  };

  // Handle rating deletion
  const handleDeleteRating = async () => {
    if (!isAuthenticated || userRating === null) return;
    
    try {
      setSubmittingRating(true);
      await deleteRating(movieId);
      setUserRating(null);
      
      const ratingData = await getMovieRating(movieId);
      setMovieRating(ratingData || { averageRating: 0, ratingCount: 0 });
    } catch (err) {
      console.error('Error deleting rating:', err);
      alert('Failed to remove rating. Please try again.');
    } finally {
      setSubmittingRating(false);
    }
  };

  if (loading) return <div className="loading-container">Loading...</div>;
  if (error) return <div className="error-container">{error}</div>;
  if (!movie) return <div className="not-found-container">Movie not found</div>;

  // Ensure genres is an array
  const genresArray = typeof movie.genres === 'string' ? movie.genres.split(',') : (movie.genres || []);
  
  return (
    <div className="movie-detail-container">
      {/* Movie Details Section */}
      <div className="movie-detail-content">
        <div className="movie-poster">
          <img 
            src={movie.poster_url || 'https://via.placeholder.com/300x450?text=No+Image'} 
            alt={`${movie.title} Poster`} 
            className="poster-image"
            onError={(e) => {
              e.target.onerror = undefined;
              e.target.src = 'https://via.placeholder.com/300x450?text=Image+Error';
            }}
          />
        </div>
        
        <div className="movie-info">
          <h1 className="movie-title">{movie.title}</h1>
          <div className="movie-rating">
            <span className="rating-text">{movieRating.averageRating || 0}/10</span>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                <span 
                  key={star}
                  className="star-icon"
                >
                  ★
                </span>
              ))}
            </div>
            <span className="rating-count">({movieRating.ratingCount || 0} ratings)</span>
          </div>
          
          <div className="movie-meta">
            <p><span className="meta-label">Release Year:</span> {movie.release_year || 'Not specified'}</p>
            <p><span className="meta-label">Duration:</span> {movie.duration ? `${movie.duration} min` : 'Not specified'}</p>
            <p><span className="meta-label">Genres:</span> {genresArray.join(', ')}</p>
            <p><span className="meta-label">Type:</span> {movie.type || 'Movie'}</p>
          </div>
          
          <div className="movie-overview">
            <h3 className="overview-title">Overview</h3>
            <p>{movie.description || 'No description available'}</p>
          </div>
          
          {/* User Rating Section */}
          {isAuthenticated && (
            <div className="user-rating-section">
              <h3 className="rating-title">Rate this {movie.type || 'movie'}</h3>
              <div className="rating-controls">
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                    <span 
                      key={star}
                      className={`star-icon ${ (hoverRating || userRating) >= star ? 'active' : '' }`}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => handleRateMovie(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="user-rating-text">
                  {userRating ? `Your rating: ${userRating}/10` : 'Not rated yet'}
                </span>
                {userRating && (
                  <button
                    className="remove-rating-button"
                    onClick={handleDeleteRating}
                    disabled={submittingRating}
                  >
                    Remove rating
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Comments Section */}
      <div className="comments-section">
        <h2 className="comments-title">Comments</h2>
        
        {/* Add Comment Form */}
        {isAuthenticated ? (
          <form onSubmit={handleSubmitComment} className="comment-form">
            <textarea
              className="comment-input"
              rows="4"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              required
            />
            <button
              type="submit"
              className="submit-comment-button"
              disabled={submittingComment}
            >
              {submittingComment ? 'Submitting...' : 'Submit Comment'}
            </button>
          </form>
        ) : (
          <p>Please log in to add a comment.</p>
        )}
        
        {/* Comments List */}
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <p className="comment-author">{comment.user_id ? comment.user_id.name : 'Unknown User'}</p>
              <p className="comment-text">{comment.content}</p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage; 
