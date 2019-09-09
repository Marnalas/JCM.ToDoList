import React from "react";
import { Row, Col, Jumbotron } from "react-bootstrap";
import ToDoItem from "./toDoItem";
import { useToDoState } from "../../stateManagement/contexts/toDoContext";

/**
 * A component to render a list of ToDo items.
 */
const ToDoList: React.FC = () => {
  const state = useToDoState();

  return (
    <Row>
      {state.toDos.length > 0 ? (
        state.toDos
          .sort((prevToDo, nextToDo) => {
            return prevToDo.order - nextToDo.order;
          })
          .map((toDo, index) => (
            <ToDoItem
              key={index}
              id={toDo.id}
              order={toDo.order}
              title={toDo.title}
              description={toDo.description}
              isDone={toDo.isDone}
            />
          ))
      ) : (
        <Col xs={12}>
          <Jumbotron fluid className="px-3 mb-3">
            <h1>Nothing to do !</h1>
            <p>Use the button below to add some stuff to do.</p>
          </Jumbotron>
        </Col>
      )}
    </Row>
  );
};

export default ToDoList;
