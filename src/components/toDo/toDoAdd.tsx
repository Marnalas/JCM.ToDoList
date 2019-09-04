import React from "react";
import { Button } from "react-bootstrap";
import {
  useToDoDispatch,
  useToDoState
} from "../../stateManagement/contexts/toDoContext";
import { ToDoActionTypes } from "../../stateManagement/definitions/toDoDefinitions";
import { handleToDoAction } from "../../stateManagement/middlewares/toDoFirebaseMiddleware";

const ToDoAdd: React.FC = () => {
  const state = useToDoState();
  const dispatch = useToDoDispatch();

  const addToDo = () => {
    handleToDoAction(dispatch)({
      type: ToDoActionTypes.ADD_ACTION,
      payload: [
        {
          id: Math.random().toString(),
          order:
            state.toDos.length > 0
              ? 1 + Math.max.apply(Math, state.toDos.map(toDo => toDo.order))
              : 0,
          title: "New task",
          description: "What I have to do",
          isDone: false
        }
      ]
    });
  };

  return (
    <Button variant="success" onClick={addToDo}>
      Add something to do
    </Button>
  );
};

export default ToDoAdd;
