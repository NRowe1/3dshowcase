import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} style={{ marginBottom: '10px' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Sketchfab"
        style={{ padding: '5px', fontSize: '16px', width: '200px' }}
      />
      <button type="submit" style={{ padding: '5px', fontSize: '16px' }}>Search</button>
    </form>
  );
}

export default SearchBar;  // Ensure the default export
