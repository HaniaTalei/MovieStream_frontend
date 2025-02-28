import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../pages/styles/navbar.css';

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    rating: ''
  });

  const handleLogout = () => {
    logoutUser();
    setShowDropdown(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery, 'with filters:', filters);
    
    // Here you would typically call a search API or filter your existing data
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">FilmStream</Link>

        <div className="search-container">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="button" onClick={toggleFilters} className="filter-toggle-btn">
              <i className="fa fa-filter"></i>
            </button>
            <button type="submit" className="search-btn">
              <i className="fa fa-search"></i>
            </button>
          </form>
          
          {showFilters && (
            <div className="filters-dropdown">
              <div className="filter-group">
                <label htmlFor="genre">Genre:</label>
                <select 
                  id="genre" 
                  value={filters.genre}
                  onChange={(e) => setFilters({...filters, genre: e.target.value})}
                >
                  <option value="">All Genres</option>
                  <option value="ction">Action</option>
                  <option value="comedy">Comedy</option>
                  <option value="drama">Drama</option>
                  <option value="horror">Horror</option>
                  <option value="scifi">Sci-Fi</option>
                </select>
              </div>
              <div className="filter-group">
                <label htmlFor="year">Year:</label>
                <select 
                  id="year" 
                  value={filters.year}
                  onChange={(e) => setFilters({...filters, year: e.target.value})}
                >
                  <option value="">All Years</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2010s">2010-2019</option>
                  <option value="2000s">2000-2009</option>
                  <option value="1990s">1990-1999</option>
                  <option value="1980">1980-1989</option>
                </select>
              </div>
              <div className="filter-group">
                <label htmlFor="rating">Rating:</label>
                <select 
                  id="rating" 
                  value={filters.rating}
                  onChange={(e) => setFilters({...filters, rating: e.target.value})}
                >
                  <option value="">All Ratings</option>
                  <option value="9">9+</option>
                  <option value="8">8+</option>
                  <option value="7">7+</option>
                  <option value="6">6+</option>
                  <option value="5">5+</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="navbar-links">
          {user ? (
            <div className="profile-dropdown">
              <button onClick={toggleDropdown} className="profile-button">
                {user.name || user.email.split('@')[0]}
                <i className={`fa fa-chevron-${showDropdown ? 'up' : 'down'}`}></i>
              </button>
              
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    My Profile
                  </Link>
                  <Link to="/api/watchlist" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    My Watchlist
                  </Link>
                  {user.role === 'admin' && (
                    <>
                      <Link to="/admin/content" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                        Manage Content
                      </Link>
                      <Link to="/admin/users" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                        Manage Users
                      </Link>
                    </>
                  )}
                  <button onClick={handleLogout} className="dropdown-item logout-button">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="navbar-button">
              Login / Sign Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;