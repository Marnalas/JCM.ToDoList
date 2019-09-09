import React from "react";

/**
 * https://reactjs.org/docs/error-boundaries.html
 * Global error boundary catching any unhandled error.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    console.log(`${error}`);
    console.log(`Error info: ${errorInfo.toString()}`);
    this.setState({ hasError: true });
  }

  render() {
    return this.state.hasError ? (
      <h1>Something went wrong.</h1>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
