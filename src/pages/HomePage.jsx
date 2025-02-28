import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import MovieList from '../components/MovieList';
import './styles/home.css';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    genre: '',
    year: '',
    rating: ''
  });
  const [filteredMovies, setFilteredMovies] = useState(null);

  // This function would be passed to the Navbar component to handle search updates
  const handleSearchUpdate = (query, filters) => {
    setSearchQuery(query);
    setActiveFilters(filters);
    
    // In a real application, you would call your API with these search parameters
    // For now, we'll just log them
    console.log('Search updated:', query, filters);
  };

  return (
    <div className="homepage-container">
      <Navbar onSearchUpdate={handleSearchUpdate} />
      <div className="homepage-inner">
        <h1 className="homepage-title">
          {searchQuery ? `Search Results for "${searchQuery}"` : "Popular Movies & Series"}
        </h1>
        
        {/* Display active filters if any */}
        {(activeFilters.genre || activeFilters.year || activeFilters.rating) && (
          <div className="active-filters">
            <span>Filters: </span>
            {activeFilters.genre && (
              <span className="filter-tag">
                Genre: {activeFilters.genre}
                <button onClick={() => setActiveFilters({...activeFilters, genre: ''})}>×</button>
              </span>
            )}
            {activeFilters.year && (
              <span className="filter-tag">
                Year: {activeFilters.year}
                <button onClick={() => setActiveFilters({...activeFilters, year: ''})}>×</button>
              </span>
            )}
            {activeFilters.rating && (
              <span className="filter-tag">
                Rating: {activeFilters.rating}+
                <button onClick={() => setActiveFilters({...activeFilters, rating: ''})}>×</button>
              </span>
            )}
            <button 
              className="clear-filters" 
              onClick={() => setActiveFilters({genre: '', year: '', rating: ''})}
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