import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ToDoProvider } from "../stateManagement/contexts/toDoContext";
import ToDoContainer from "./toDo/toDoContainer";
import Nav from "./nav/nav";

const App: React.FC = () => {
  return (
    <Container fluid={true} className="h-100">
      <Row>
        <Nav />
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
