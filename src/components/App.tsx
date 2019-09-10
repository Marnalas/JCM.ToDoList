import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ToDoContainer from "./toDo/toDoContainer";
import Header from "./nav/header";
import { useUserDispatch } from "../stateManagement/contexts/userContext";
import { useEffect } from "react";
import { UserActionTypes } from "../definitions/userDefinitions";
import { handleUserAction } from "../stateManagement/middlewares/userFirebaseMiddleware";

/**
 * The main container for the websie.
 */
const App: React.FC = () => {
  const dispatch = useUserDispatch();

  // Checking the session for an authenticated user.
  useEffect(() => {
    handleUserAction(dispatch)({
      type: UserActionTypes.READ_SESSION_ACTION,
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
          <ToDoContainer />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
