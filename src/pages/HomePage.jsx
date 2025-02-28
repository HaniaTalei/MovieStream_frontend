import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import MovieList from '../components/MovieList';
import './styles/home.css';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    genres: '',
    release_year: '',
    rating: ''
  });
  const [isSearchActive, setIsSearchActive] = useState(false);
  const handleSearchUpdate = (query, filters) => {
    setSearchQuery(query);
    setActiveFilters(filters);
    setIsSearchActive(query !== '' || filters.genre !== '' || filters.year !== '' || filters.rating !== '');
    console.log('Search updated:', query, filters);
  };

  return (
    <div className="homepage-container">
      <Navbar onSearchUpdate={handleSearchUpdate} />
      <div className="homepage-inner">
        <h1 className="homepage-title">
          {isSearchActive ? `Search Results for "${searchQuery}"` : "Popular Movies & Series"}
        </h1>

        {/* Display active filters if any */}
        {(activeFilters.genres || activeFilters.release_year || activeFilters.rating) && (
          <div className="active-filters">
            <span>Filters: </span>
            {activeFilters.genres && (
              <span className="filter-tag">
                Genre: {activeFilters.genres}
                <button onClick={() => {
                  const newFilters = { ...activeFilters, genres: '' };
                  setActiveFilters({ newFilters });
                  handleSearchUpdate(searchQuery, newFilters);
                }}>×</button>
              </span>
            )}
            {activeFilters.release_year && (
              <span className="filter-tag">
                Year: {activeFilters.release_year}
                <button onClick={() => {
                  const newFilters = { ...activeFilters, release_year: '' };
                  setActiveFilters(newFilters);
                  handleSearchUpdate(searchQuery, newFilters);

                }}>×</button>
              </span>
            )}
            {activeFilters.rating && (
              <span className="filter-tag">
                Rating: {activeFilters.rating}+
                <button onClick={() => {
                  const newFilters = { ...activeFilters, rating: '' };
                  setActiveFilters(newFilters);
                  handleSearchUpdate(searchQuery, newFilters);

                }}>×</button>
              </span>
            )}
            <button
              className="clear-filters"
              onClick={() => {
                const emptyFilters = { genres: '', release_year: '', rating: '' };
                setActiveFilters(emptyFilters);
                handleSearchUpdate(searchQuery, emptyFilters);
              }}
            >
              Clear All
            </button>
          </div>
        )}

        {/* Pass search parameters to MovieList */}
        <MovieList
          searchQuery={searchQuery}
          filters={activeFilters}
        />
      </div>
    </div>
  );
};

export default HomePage;


