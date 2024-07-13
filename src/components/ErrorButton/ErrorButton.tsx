import React from 'react';
import './ErrorButton.css';
import { ErrorButtonState } from '../../types/types';

class ErrorButton extends React.Component<
  Record<string, never>,
  ErrorButtonState
> {
  state: ErrorButtonState = {
    error: false,
    hasError: false,
  };

  handleClick = () => {
    this.setState({ error: true, hasError: true });
    throw new Error('Oops, mistake!');
  };

  render() {
    if (this.state.hasError) {
      throw new Error('Oops, mistake!');
    }
    return (
      <button className="error-button" onClick={this.handleClick}>
        ErrorBoundary
      </button>
    );
  }
}
export default ErrorButton;
