import ToDo from "../../models/toDo";

export enum ToDoActionTypes {
  "ADD_ACTION",
  "UPDATE_ACTION",
  "COMPLETE_ACTION",
  "FETCH_ACTIONS"
}

export interface ToDoAction {
  type: ToDoActionTypes;
  payload: ToDo[];
}

export type ToDoDispatcher = (action: ToDoAction) => void;

export interface ToDoState {
  toDos: ToDo[];
}
