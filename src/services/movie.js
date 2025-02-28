import api from './api';

export const getMovies = async (page = 1, limit = 12) => {
  const response = await api.get(`/movies?page=${page}&limit=${limit}`);
  return response.data;
};

export const getMovie = async (id) => {
  const response = await api.get(`/movies/${id}`);
  return response.data;
};

// Comment related functions
export const getMovieComments = async (id) => {
  const response = await api.get(`/movies/${id}/comments`);
  return response.data;
};

export const addComment = async (movieId, content) => {
  const response = await api.post(`/movies/${movieId}/comments`, { content });
  return response.data;
};


// Rating related functions
export const getMovieRating = async (movieId) => {
  const response = await api.get(`/movies/${movieId}/rating`);
  return response.data;
};

export const getUserMovieRating = async (movieId) => {
  const response = await api.get(`/movies/${movieId}/myrating`);
  return response.data;
};

export const rateMovie = async (movieId, rating) => {
  const response = await api.post(`/movies/${movieId}/rate`, { rating });
  return response.data;
};

export const deleteRating = async (movieId) => {
  const response = await api.delete(`/movies/${movieId}/rate`);
  return response.data;
};

export const getUserRatings = async (page = 1, limit = 10) => {
  const response = await api.get(`/users/me/ratings?page=${page}&limit=${limit}`);
  return response.data;
};