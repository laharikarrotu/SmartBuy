import { useState } from 'react';
import './Search.scss';

export const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual search functionality
    console.debug('Searching for:', searchQuery);
  };

  return (
    <div className="search-page">
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products..."
            className="search-input"
            autoFocus
          />
          <button type="submit" className="search-button">
            <span className="material-symbols-outlined">search</span>
          </button>
        </form>
      </div>

      {searchResults.length > 0 ? (
        <div className="search-results">
          {/* TODO: Implement search results display */}
        </div>
      ) : (
        <div className="search-empty">
          <p>Start typing to search for products</p>
        </div>
      )}
    </div>
  );
}; 