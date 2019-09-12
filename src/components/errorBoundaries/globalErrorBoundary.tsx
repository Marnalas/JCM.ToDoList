import React from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";

/**
 * https://reactjs.org/docs/error-boundaries.html
 * Global error boundary catching any unhandled error.
 */
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: "" };

  componentDidCatch(error: any, errorInfo: any) {
    console.log(`Error info: ${JSON.stringify(errorInfo)}`);
    this.setState({ hasError: true, error: error });
  }

  render() {
    return this.state.hasError ? (
      <Container fluid>
        <Row>
          <Col xs={12}>
            <h1>Something went wrong.</h1>
            <a href={window.location.href}>Please refresh the page.</a>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Alert variant="danger">
              <strong>More about the error:</strong> {this.state.error}
            </Alert>
          </Col>
        </Row>
      </Container>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
