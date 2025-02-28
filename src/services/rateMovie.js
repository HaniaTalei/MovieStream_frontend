import api from './api';

export const getMovieRatings = async (movieId) => {
  const response = await api.get(`/movies/${movieId}/ratings`);
  return response.data;
};

export const rateMovie = async (movieId, rating) => {
  const response = await api.post(`/movies/${movieId}/ratings`, { rating });
  return response.data;
};

export const getUserRating = async (movieId) => {
  const response = await api.get(`/movies/${movieId}/ratings/user`);
  return response.data;
};

export const updateRating = async (movieId, rating) => {
  const response = await api.put(`/movies/${movieId}/ratings`, { rating });
  return response.data;
};