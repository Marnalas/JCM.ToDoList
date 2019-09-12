import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ToDoContainer from "./toDo/toDoContainer";
import Header from "./nav/header";
import { useUserDispatch } from "../stateManagement/contexts/userContext";
import { useEffect } from "react";
import { UserActionTypes } from "../definitions/userDefinitions";
import { handleUserAction } from "../stateManagement/middlewares/userFirebaseMiddleware";
import { alertErrorBoundaryWrappedComponentProps } from "./errorBoundaries/alertErrorBoundary";

/**
 * The main container for the websie.
 */
const App: React.FC<alertErrorBoundaryWrappedComponentProps> = (
  props: alertErrorBoundaryWrappedComponentProps
) => {
  const dispatch = useUserDispatch();

  // Trying to get the current user.
  useEffect(() => {
    handleUserAction(
      dispatch,
      () => false,
      (hasError, error) => props.setError(hasError, error)
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
      {props.renderError()}
      <Row>
        <Col xs={12}>
          <ToDoContainer {...props} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
