import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useToDoDispatch } from "../../stateManagement/contexts/toDoContext";
import { ToDoActionTypes } from "../../stateManagement/definitions/toDoDefinitions";
import { handleToDoAction } from "../../stateManagement/middlewares/toDoFirebaseMiddleware";
import ToDoList from "./toDoList";
import ToDoAdd from "./toDoAdd";

/**
 * A component to contain all ToDo components.
 */
const ToDoContainer: React.FC = () => {
  const dispatch = useToDoDispatch();

  /**
   * Once the component is loaded then the state is loaded with the ToDo data.
   */
  useEffect(() => {
    handleToDoAction(dispatch)({
      type: ToDoActionTypes.FETCH_ACTIONS,
      payload: []
    });
  });

  return (
    <>
      <ToDoList />
      <Row>
        <Col xs={12}>
          <ToDoAdd />
        </Col>
      </Row>
    </>
  );
};

export default ToDoContainer;
