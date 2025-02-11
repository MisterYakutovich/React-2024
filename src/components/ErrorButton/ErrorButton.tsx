import React, { useState } from 'react';
import './ErrorButton.css';
import { ErrorButtonState } from '../../types/types';

const ErrorButton: React.FC = () => {
  const [state, setState] = useState<ErrorButtonState>({
    error: false,
    hasError: false,
  });

  const handleClick = () => {
    setState({ error: true, hasError: true });
    throw new Error('Oops, mistake!');
  };

  if (state.hasError) {
    throw new Error('Oops, mistake!');
  }

  return (
    <button className="error-button" onClick={handleClick}>
      ErrorBoundary
    </button>
  );
};

export default ErrorButton;
