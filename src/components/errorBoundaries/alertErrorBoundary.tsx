import React from "react";
import { Alert, Row, Col } from "react-bootstrap";
import { setError } from "../../definitions/errorDefinitions";

/**
 * The properties of any ToDo component wrapped by the toDoErrorBoundary.
 */
export interface alertErrorBoundaryWrappedComponentProps {
  renderError: () => JSX.Element;
  setError: setError;
}

/**
 * Global error boundary catching any unhandled error.
 */
export const alertErrorBoundary = (
  WrappedComponent: React.FC<alertErrorBoundaryWrappedComponentProps>
) => {
  /**
   * A HOC to handle all components' errors by showing them inside an alert.
   */
  return class alertHOC extends React.Component {
    state = { hasError: false, error: "" };

    componentDidCatch(error: any, errorInfo: any) {
      console.log(`${error}`);
      console.log(`Error info: ${JSON.stringify(errorInfo)}`);
      this.setState({ hasError: true, error: error });
    }

    /**
     * Renders the error container.
     */
    renderError = () => {
      return (
        <>
          {this.state.hasError && (
            <Row>
              <Col xs={12}>
                <Alert variant="danger">
                  <strong>An error occurred:</strong> {this.state.error}
                </Alert>
              </Col>
            </Row>
          )}
        </>
      );
    };

    /**
     * Sets the error state.
     * @param error The error to set.
     */
    setError = (hasError: boolean, error: string) => {
      this.setState({ hasError: hasError, error: error });
    };

    render() {
      return (
        <WrappedComponent
          renderError={this.renderError}
          setError={this.setError}
        />
      );
    }
  };
};
