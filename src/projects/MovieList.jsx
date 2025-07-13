import React from 'react';
import styled from 'styled-components';
import MovieCard from './MovieCard';

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
`;

export default function MovieList({ movies, onSelect }) {
  return (
    <Grid>
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} onClick={onSelect} />
      ))}
    </Grid>
  );
}
