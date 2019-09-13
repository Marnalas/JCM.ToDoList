import React from "react";
import { Col, Jumbotron } from "react-bootstrap";
import ToDoItem from "./ToDoItem";
import ToDo from "../../models/ToDo";

/**
 * The props of the ToDoList component.
 */
export interface ToDoListProps {
  toDos: Partial<ToDo>[];
  updateToDo: (id: string, title: string, description: string) => void;
  completeToDo: (id: string) => void;
}

/**
 * A component to render a list of ToDo items.
 * @param props
 */
const ToDoList: React.FC<ToDoListProps> = (props: ToDoListProps) => (
  <>
    {props.toDos.length === 0 ? (
      <Col xs={12}>
        <Jumbotron fluid className="px-3 mb-3">
          <h1>Nothing to do !</h1>
          <p>Use the button below to add some stuff to do.</p>
        </Jumbotron>
      </Col>
    ) : (
      props.toDos.map((toDo, index) => (
        <ToDoItem
          key={index}
          toDo={toDo}
          updateToDo={props.updateToDo}
          completeToDo={props.completeToDo}
        />
      ))
    )}
  </>
);

export default ToDoList;
