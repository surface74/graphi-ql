import React, { ErrorInfo } from 'react';
import {
  IErrorBoundaryProps,
  IErrorBoundaryState,
} from './ErrorBoundary.types';
import errorMessages from '../../assets/errorMessages.json';

export default class ErrorBoundary extends React.Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  public state: IErrorBoundaryState = {
    hasError: false,
  };

  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(): IErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback ? (
        this.props.fallback
      ) : (
        <h1>{errorMessages.ERROR_MESSAGE.En}</h1>
      );
    }

    return this.props.children || null;
  }
}
