import React from 'react';
import Page from './Page';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import StarrySky from './components/starrySky/StarrySky';

class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <Page />       
      </ErrorBoundary>
    );
  }
}
export default App;
