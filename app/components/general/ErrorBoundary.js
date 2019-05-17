import React from 'react';
import propTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  static propTypes = {
    children: propTypes.any,
  };

  static defaultProps = {
    children: null,
  };

  state = { hasError: false };

  componentDidCatch(error, info) {
    console.log(`Error caught in boundary: ${error} = ${info}`);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return children;
  }
}

export default ErrorBoundary;
