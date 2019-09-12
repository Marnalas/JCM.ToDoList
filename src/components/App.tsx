import React from "react";
import { Container, Row, Col } from "react-bootstrap";
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

  // Trying to get the current user.
  useEffect(() => {
    handleUserAction(dispatch, () => false, (hasError, error) => false)({
      type: UserActionTypes.INITIALIZE_AUTH_ACTION,
      payload: {}
    });
  });

  return (
    <Container fluid>
      <Row>
        <Header />
      </Row>
      <Row>
        <Col xs={12}>
          {React.createElement(alertErrorBoundary(ToDoContainer))}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
