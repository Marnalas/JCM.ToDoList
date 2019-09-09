import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ToDoProvider } from "../stateManagement/contexts/toDoContext";
import ToDoContainer from "./toDo/toDoContainer";
import Header from "./nav/header";
import { UserProvider } from "../stateManagement/contexts/userContext";
import ErrorBoundary from "./error/errorBoundary";

/**
 * The main container for the websie.
 */
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <UserProvider>
        <Container fluid>
          <Row>
            <Header />
          </Row>
          <Row>
            <Col xs={12}>
              <ToDoProvider>
                <ToDoContainer />
              </ToDoProvider>
            </Col>
          </Row>
        </Container>
      </UserProvider>
    </ErrorBoundary>
  );
};

export default App;
