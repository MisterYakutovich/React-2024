import { ReactNode } from 'react';
import Page from './Page';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App(): ReactNode {
  return (
    <ErrorBoundary>
      <Page />
    </ErrorBoundary>
  );
}
export default App;
