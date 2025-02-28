import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Import pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import WatchlistPage from './pages/watchListPage';
import AdminContentPage from './pages/AdminContentPage';
import AdminUsersPage from './pages/AdminUsersPage';
import MoviePage from './pages/MoviePage';



function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/movies/:movieId" element={<MoviePage />} />

          {/* Protected routes */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          
          <Route path="/api/watchlist" element={
            <ProtectedRoute>
              <WatchlistPage />
            </ProtectedRoute>
          } />
          
          {/* Admin routes */}
          <Route path="/admin/content" element={
            <ProtectedRoute adminOnly={true}>
              <AdminContentPage />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/users" element={
            <ProtectedRoute adminOnly={true}>
              <AdminUsersPage />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;