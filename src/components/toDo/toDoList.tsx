import React from "react";
import { Row, Col, Jumbotron } from "react-bootstrap";
import ToDoItem from "./toDoItem";
import { useToDoState } from "../../stateManagement/contexts/toDoContext";
import { useUserState } from "../../stateManagement/contexts/userContext";

/**
 * A component to render a list of ToDo items.
 */
const ToDoList: React.FC = () => {
  const state = useToDoState();
  const userState = useUserState();

  return (
    <Row>
      {!userState.user.isAuthenticated || false ? (
        <Col xs={12}>
          <Jumbotron fluid className="px-3 mb-3">
            <h1>Not connected yet</h1>
            <p>Use the connection button up there to get started.</p>
          </Jumbotron>
        </Col>
      ) : state.toDos.length === 0 ? (
        <Col xs={12}>
          <Jumbotron fluid className="px-3 mb-3">
            <h1>Nothing to do !</h1>
            <p>Use the button below to add some stuff to do.</p>
          </Jumbotron>
        </Col>
      ) : (
        state.toDos
          .sort((prevToDo, nextToDo) => {
            return (prevToDo.order || 0) - (nextToDo.order || 0);
          })
          .map((toDo, index) => (
            <ToDoItem
              key={index}
              id={toDo.id}
              title={toDo.title}
              description={toDo.description}
              isDone={toDo.isDone}
            />
          ))
      )}
    </Row>
  );
};

export default ToDoList;
