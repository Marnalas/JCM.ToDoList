import React from "react";
import { Button } from "react-bootstrap";
import {
  useToDoDispatch,
  useToDoState
} from "../../stateManagement/contexts/toDoContext";
import { useUserState } from "../../stateManagement/contexts/userContext";
import { ToDoActionTypes } from "../../stateManagement/definitions/toDoDefinitions";
import { handleToDoAction } from "../../stateManagement/middlewares/toDoFirebaseMiddleware";

/**
 * A component to add ToDo items.
 */
const ToDoAdd: React.FC = () => {
  const state = useToDoState();
  const dispatch = useToDoDispatch();
  const userState = useUserState();
  /**
   * Adds a new ToDo item to the state.
   */
  const addToDo = () => {
    handleToDoAction(dispatch)({
      type: ToDoActionTypes.ADD_ACTION,
      payload: [
        {
          id: (Math.random() * 10 ** 17).toString(),
          user: userState.user.email,
          order:
            state.toDos.length > 0
              ? 1 +
                Math.max.apply(Math, state.toDos.map(toDo => toDo.order || 0))
              : 0,
          title: "New task",
          description: "What I have to do",
          isDone: false
        }
      ]
    });
  };

  return (
    <>
      {(userState.user.isAuthenticated || false) && (
        <Button variant="success" onClick={addToDo}>
          Add something to do
        </Button>
      )}
    </>
  );
};

export default ToDoAdd;
