import { ErrorInfo } from 'react';

export interface ArrSearchResult {
  url: string;
  name: string;
  id: string;
  birth_year: string;
  height: string;
}

export interface PeopleArray {
  name: string;
  id: string;
  url: string;
  birth_year: string;
  height: string;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}
export interface ErrorButtonState {
  error: boolean;
  hasError: boolean;
}
