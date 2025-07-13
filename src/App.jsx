// src/App.jsx
import React, { useState } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import SearchBar from './projects/SearchBar';
import MovieList from './projects/MovieList';
import MovieDetailsModal from './projects/MovieDetailsModal';
import ThemeToggle from './projects/ThemeToggle';
import { lightTheme, darkTheme } from './styles/theme';

const API_KEY = '5daa4c73'; // Your OMDb API key, no extra spaces!

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Arial, Helvetica, sans-serif;
    transition: all 0.3s ease;
  }
`;

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 1rem;
`;

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cache, setCache] = useState({});

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    const cacheKey = query.toLowerCase();

    if (cache[cacheKey]) {
      setMovies(cache[cacheKey]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
      );
      const data = await res.json();

      if (data.Response === 'True' && Array.isArray(data.Search)) {
        setMovies(data.Search);
        setCache((prev) => ({ ...prev, [cacheKey]: data.Search }));
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (imdbID) => {
    if (!imdbID) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`
      );
      const data = await res.json();

      if (data.Response === 'True') {
        setSelectedMovie(data);
      } else {
        setSelectedMovie(null);
      }
    } catch (error) {
      console.error('Details fetch error:', error);
      setSelectedMovie(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => setSelectedMovie(null);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Container>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>🎬 Movie Explorer</h1>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </header>

        <SearchBar onSearch={handleSearch} />

        {loading && <p>Loading...</p>}

        {!loading && movies.length === 0 && <p>No results found.</p>}

        <MovieList movies={movies} onSelect={handleSelect} />

        {selectedMovie && <MovieDetailsModal movie={selectedMovie} onClose={handleClose} />}
      </Container>
    </ThemeProvider>
  );
}
