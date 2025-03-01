import React, { createContext, useState, useContext, useLayoutEffect } from 'react';
import { getUser } from '../services/auth';

const AuthContext = createContext({
  user: null,
  loading: true,
  loginUser: () => {},
  logoutUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveUserToLocalStorage = (userData) => {
    try {
      if (userData && userData.token) {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userData.token);
      }
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
    }
  };

  const removeUserFromLocalStorage = () => {
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Error removing user from localStorage:', error);
    }
  };

  useLayoutEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await getUser();
          if (userData) {
            setUser(userData);
            saveUserToLocalStorage(userData);
          } else {
            setUser(null);
            removeUserFromLocalStorage();
          }
        } else {
          setUser(null);
          removeUserFromLocalStorage();
        }
      } catch (error) {
        console.error('Load user error:', error);
        if (error.response && error.response.status === 401) {
          setUser(null);
          removeUserFromLocalStorage();
        } else {
          console.error('Unexpected error:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const loginUser = (userData) => {
    if (userData && userData.token) {
      setUser(userData);
      saveUserToLocalStorage(userData);
    }
  };

  const logoutUser = () => {
    setUser(null);
    removeUserFromLocalStorage();
  };

  const contextValue = {
    user,
    loading,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};