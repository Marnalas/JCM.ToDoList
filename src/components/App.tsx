import React, { useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import ToDoContainer from "./toDo/toDoContainer";
import Header from "./nav/header";
import { useUserDispatch } from "../stateManagement/contexts/userContext";
import { useEffect } from "react";
import { UserActionTypes } from "../definitions/userDefinitions";
import { handleUserAction } from "../stateManagement/middlewares/userFirebaseMiddleware";
import { alertErrorBoundary } from "./errorBoundaries/alertErrorBoundary";

/**
 * The main container for the websie.
 */
const App: React.FC = () => {
  const dispatch = useUserDispatch();
  const [state, setState] = useState({ hasError: false, error: "" });

  // Trying to get the current user.
  useEffect(() => {
    handleUserAction(
      dispatch,
      () => false,
      (hasError, error) => setState({ hasError: hasError, error: error })
    )({
      type: UserActionTypes.INITIALIZE_AUTH_ACTION,
      payload: {}
    });
  }, [dispatch]);

  return (
    <Container fluid>
      <Row>
        <Header />
      </Row>
      {state.hasError && (
        <Row>
          <Col xs={12}>
            <Alert variant="danger">
              <strong>An error occurred:</strong> {state.error}
            </Alert>
          </Col>
        </Row>
      )}
      <Row>
        <Col xs={12}>
          {React.createElement(alertErrorBoundary(ToDoContainer))}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
