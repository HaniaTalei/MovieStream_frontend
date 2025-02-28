import api from './api';


export const getWatchlist = async () => {
    const response = await api.get('/api/watchlist');
    return response.data;
  };
  
  export const addToWatchlist = async (movieId, status = 'want_to_watch') => {
    const response = await api.post('/api/watchlist', { movieId, status });
    return response.data;
  };
  
  export const updateWatchlistStatus = async (id, status) => {
    const response = await api.put(`/api/watchlist/${id}`, { status });
    return response.data;
  };
  
  export const removeFromWatchlist = async (id) => {
    await api.delete(`/api/watchlist/${id}`);
  };