import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  cursor: pointer;
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: center;
  border-radius: 4px;
  &:focus {
    outline: 2px solid #0077cc;
  }
`;

const Poster = styled.img`
  max-width: 100%;
  height: auto;
`;

export default function MovieCard({ movie, onClick }) {
  return (
    <Card
      tabIndex={0}
      role="button"
      onClick={() => onClick(movie.imdbID)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(movie.imdbID);
        }
      }}
      aria-label={`View details for ${movie.Title}`}
    >
      <Poster src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.jpg'} alt={movie.Title} />
      <div>{movie.Title}</div>
    </Card>
  );
}
