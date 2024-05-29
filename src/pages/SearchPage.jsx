import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

function SearchPage() {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/results?query=${query}`);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
}

export default SearchPage;  // Ensure the default export
