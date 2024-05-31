// src/pages/ResultsPage.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import '../styles/ResultsPage.css';  // Import the CSS file

function ResultsPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedModelUid, setSelectedModelUid] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (query) {
      handleSearch(query);
    }
  }, [query]);

  const handleSearch = async (query) => {
    const response = await fetch(`https://api.sketchfab.com/v3/search?type=models&q=${query}&features=downloadable`, {
      headers: {
        Authorization: `Bearer d9528636b2bb4ef7861e721de45cb231`,
      },
    });
    const data = await response.json();
    setSearchResults(data.results);
  };

  const handleModelSelect = (uid) => {
    setSelectedModelUid(uid);
  };

  useEffect(() => {
    if (selectedModelUid) {
      const iframe = document.getElementById('sketchfab-iframe');
      const client = new window.Sketchfab(iframe);
      client.init(selectedModelUid, {
        success: () => {
          console.log('Model loaded successfully');
        },
        error: () => {
          console.log('Error loading model');
        },
      });
    }
  }, [selectedModelUid]);

  return (
    <div>
      <div className="container">
        <div className="sidebar">
          <SearchBar onSearch={(query) => navigate(`/results?query=${query}`)} className="search-bar" />
          <ul className="results-list">
            {searchResults.map((result) => (
              <li key={result.uid} onClick={() => handleModelSelect(result.uid)} className="result-item">
                <img src={result.thumbnails.images[0].url} alt={result.name} />
                {result.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="viewer-container">
          <iframe
            id="sketchfab-iframe"
            title="Sketchfab Viewer"
            allow="autoplay; fullscreen; vr"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;
