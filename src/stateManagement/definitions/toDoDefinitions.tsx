import ToDo from "../../models/toDo";

/**
 * The different types of actions for the ToDoContext.
 */
export enum ToDoActionTypes {
  "ADD_ACTION",
  "UPDATE_ACTION",
  "COMPLETE_ACTION",
  "FETCH_ACTIONS"
}

/**
 * The structure of an action for the ToDoContext.
 */
export interface ToDoAction {
  type: ToDoActionTypes;
  payload: ToDo[];
}

/**
 * The structure of a dispatcher for the ToDoContext.
 */
export type ToDoDispatcher = (action: ToDoAction) => void;

/**
 * The structure of a state for the ToDoContext.
 */
export interface ToDoState {
  toDos: ToDo[];
}
