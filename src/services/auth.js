import api from './api';

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/signup', userData);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return user || { email: userData.email };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user)); // ذخیره اطلاعات کاربر
    return user || { email: credentials.email };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    localStorage.removeItem('token');
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
    // Still remove token even if server logout fails
    localStorage.removeItem('token');
  }
};

export const getUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    console.error('Get user error:', error);
    localStorage.removeItem('token');
    return null;
  }
};