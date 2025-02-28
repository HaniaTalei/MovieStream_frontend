import api from './api';


export const getSearchedMovies = async (page = 1, limit = 12, searchParams = {}) => {
  // ساخت پارامترهای URL براساس معیارهای جستجو و فیلتر
  let queryParams = `page=${page}&limit=${limit}`;
  
  // افزودن پارامتر جستجو اگر وجود داشته باشد
  if (searchParams.search) {
    queryParams += `&search=${encodeURIComponent(searchParams.search)}`;
  }
  
  // افزودن فیلترهای مختلف
  if (searchParams.genres) {
    queryParams += `&genres=${encodeURIComponent(searchParams.genres)}`;
  }
  
  if (searchParams.release_year) {
    queryParams += `&release_year=${encodeURIComponent(searchParams.release_year)}`;
  }
  
  if (searchParams.rating) {
    queryParams += `&rating=${encodeURIComponent(searchParams.rating)}`;
  }

  const url = `/movies?${queryParams}`;
  console.log('API Request URL:', url); // برای دیباگ کردن
  
  const response = await api.get(url);
  return response.data;
};




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