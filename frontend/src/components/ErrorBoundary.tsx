import React from 'react';

interface State {
  hasError: boolean;
  error: any;
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can log error info here if needed
    // console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-xl mx-auto mt-12 p-6 bg-red-100 text-red-800 rounded shadow text-center">
          <h2 className="text-2xl font-bold mb-2">Something went wrong.</h2>
          <div>{this.state.error?.message || 'An unexpected error occurred.'}</div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary; 