import React, { useEffect } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: white;
  padding: 1rem;
  max-width: 600px;
  width: 100%;
  border-radius: 8px;
  position: relative;
`;

const Close = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;

export default function MovieDetailsModal({ movie, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <Overlay onClick={onClose}>
      <Modal role="dialog" onClick={(e) => e.stopPropagation()} aria-modal="true">
        <Close onClick={onClose} aria-label="Close details">&times;</Close>
        <h2>{movie.Title} ({movie.Year})</h2>
        <p><strong>Rating:</strong> {movie.imdbRating}</p>
        <p>{movie.Plot}</p>
        {movie.Website && <a href={movie.Website} target="_blank" rel="noreferrer">Official Site</a>}
        {!movie.Website && <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(movie.Title + ' trailer')}`} target="_blank" rel="noreferrer">Watch Trailer</a>}
      </Modal>
    </Overlay>
  );
}
