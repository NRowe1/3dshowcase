// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResultsPage from './pages/ResultsPage';
import SearchBar from './components/SearchBar'; // Add this import if SearchBar is used as a route component
import './styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/" element={<SearchBar onSearch={(query) => window.location.href = `/results?query=${query}`} />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
