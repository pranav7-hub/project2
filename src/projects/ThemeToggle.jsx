import React from 'react';
import styled from 'styled-components';

const Toggle = styled.button`
  margin-left: auto;
  padding: 0.5rem;
`;

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <Toggle onClick={toggleTheme}>
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </Toggle>
  );
}
