import React from "react";
import { ToDoDispatcher, ToDoState } from "../definitions/toDoDefinitions";
import toDoReducer from "../reducers/toDoReducer";

/*
This splitting is from this article https://kentcdodds.com/blog/how-to-use-react-context-effectively.
It is not by no means necessary in this situation but I wished to try it and learn how to use it as it can be very helpful.
*/
const ToDoStateContext = React.createContext<ToDoState | undefined>(undefined);
const ToDoDispatchContext = React.createContext<ToDoDispatcher | undefined>(
  undefined
);

interface ToDoProviderProps {
  children: React.ReactNode;
}
/**
 * The provider component for the ToDoContext.
 * @param param0 The object containing the children of the component.
 */
const ToDoProvider = ({ children }: ToDoProviderProps) => {
  const [state, dispatch] = React.useReducer(toDoReducer, { toDos: [] });

  return (
    <ToDoStateContext.Provider value={state}>
      <ToDoDispatchContext.Provider value={dispatch}>
        {children}
      </ToDoDispatchContext.Provider>
    </ToDoStateContext.Provider>
  );
};

/**
 * Returns the state for the ToDoContext.
 */
const useToDoState = () => {
  const context = React.useContext(ToDoStateContext);
  if (context === undefined)
    throw new Error("useToDoState must be used within a ToDoProvider");
  return context;
};

/**
 * Returns the dispatch for the ToDoContext.
 */
const useToDoDispatch = () => {
  const context = React.useContext(ToDoDispatchContext);
  if (context === undefined)
    throw new Error("useToDoDispatch must be used within a ToDoProvider");
  return context;
};

export { ToDoProvider, useToDoState, useToDoDispatch };
