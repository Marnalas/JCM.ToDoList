import React, { useState, useEffect } from "react";
import { Row, Col, Button, Jumbotron } from "react-bootstrap";
import ToDoList from "./toDoList";
import { ToDoRepository } from "../../DAL/Repositories/toDoRepository";
import { useUserState } from "../../stateManagement/contexts/userContext";
import ToDo from "../../models/toDo";
import { alertErrorBoundaryWrappedComponentProps } from "../errorBoundaries/alertErrorBoundary";

/**
 * A component to contain and manage all ToDo components.
 */
const ToDoContainer: React.FC<alertErrorBoundaryWrappedComponentProps> = (
  props: alertErrorBoundaryWrappedComponentProps
) => {
  const userState = useUserState();
  const [state, setState] = useState<Partial<ToDo[]>>([]);
  const toDoRepository = new ToDoRepository();

  // Once the component is loaded then the state is loaded with the ToDo data.
  useEffect(() => {
    if (userState.user.isAuthenticated)
      new ToDoRepository().fetchToDos(userState.user.email)(toDos => {
        props.setError(false, undefined);
        setState(toDos);
      }, props.setError);
  }, [userState.user.isAuthenticated, userState.user.email]);

  /**
   * Adds a ToDo item.
   */
  const addToDo = () => {
    toDoRepository.saveToDo({
      id: (Math.random() * 10 ** 18).toString(),
      user: userState.user.email,
      order:
        state.length > 0
          ? 1 + Math.max.apply(Math, state.map(toDo => toDo.order || 0))
          : 0,
      title: "New task",
      description: "What I have to do",
      isDone: false
    })(toDo => {
      props.setError(false, undefined);
      setState([...state, toDo]);
    }, props.setError);
  };

  /**
   * Updates the ToDo item.
   * @param id The id of the ToDo item to update.
   * @param title The updated title.
   * @param description The updated description
   */
  const updateToDo = (id: string, title: string, description: string) => {
    const toDoIndex = state.map(toDo => toDo.id).indexOf(id);
    toDoRepository.saveToDo({
      ...state[toDoIndex],
      title: title,
      description: description
    })(toDo => {
      props.setError(false, undefined);
      setState([
        ...state.slice(0, toDoIndex),
        toDo,
        ...state.slice(toDoIndex + 1, state.length)
      ]);
    }, props.setError);
  };

  /**
   * Sets the ToDo item to completed.
   * @param id The id of the ToDo item to complete.
   */
  const completeToDo = (id: string) => {
    const toDoIndex = state.map(toDo => toDo.id).indexOf(id);
    toDoRepository.completeToDo({
      ...state[toDoIndex],
      isDone: true
    })(toDo => {
      props.setError(false, undefined);
      setState([
        ...state.slice(0, toDoIndex),
        ...state.slice(toDoIndex + 1, state.length)
      ]);
    }, props.setError);
  };

  return (
    <>
      <Row>
        {!userState.user.isAuthenticated || false ? (
          <Col xs={12}>
            <Jumbotron fluid className="px-3 mb-3">
              <h1>Not connected yet</h1>
              <p>Use the connection button up there to get started.</p>
            </Jumbotron>
          </Col>
        ) : (
          <ToDoList
            toDos={state}
            updateToDo={updateToDo}
            completeToDo={completeToDo}
          />
        )}
      </Row>
      {(userState.user.isAuthenticated || false) && (
        <Row className="mb-3">
          <Col xs={12}>
            <Button variant="success" onClick={addToDo}>
              Add something to do
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ToDoContainer;
