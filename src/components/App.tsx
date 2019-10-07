import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ToDoContainer from "./toDo/ToDoContainer";
import Header from "./nav/Header";
import { useUserDispatch } from "../stateManagement/contexts/userContext";
import { useEffect } from "react";
import { UserActionTypes } from "../definitions/userDefinitions";
import { alertErrorBoundaryWrappedComponentProps } from "./errorBoundaries/withAlertErrorBoundary";

/**
 * The main container for the websie.
 */
const App: React.FC<alertErrorBoundaryWrappedComponentProps> = (
  props: alertErrorBoundaryWrappedComponentProps
) => {
  const dispatch = useUserDispatch();

  // Trying to get the current user.
  useEffect(() => {
    dispatch(
      {
        type: UserActionTypes.INITIALIZE_AUTH_ACTION,
        payload: {}
      },
      () => false,
      (hasError, error) => props.setError(hasError, error)
    );
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
