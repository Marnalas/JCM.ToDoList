import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ToDoProvider } from "../stateManagement/contexts/toDoContext";
import ToDoContainer from "./toDo/toDoContainer";
import Header from "./nav/header";

/**
 * The main container for the websie.
 */
const App: React.FC = () => {
  return (
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
  );
};

export default App;
