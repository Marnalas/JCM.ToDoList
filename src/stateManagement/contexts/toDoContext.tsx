import React from "react";
import { ToDoDispatcher, ToDoState } from "../definitions/toDoDefinitions";
import toDoReducer from "../reducers/toDoReducer";

type toDoProviderProps = { children: React.ReactNode };

const ToDoStateContext = React.createContext<ToDoState | undefined>(undefined);
const ToDoDispatchContext = React.createContext<ToDoDispatcher | undefined>(
  undefined
);

const ToDoProvider = ({ children }: toDoProviderProps) => {
  const [state, dispatch] = React.useReducer(toDoReducer, { toDos: [] });

  return (
    <ToDoStateContext.Provider value={state}>
      <ToDoDispatchContext.Provider value={dispatch}>
        {children}
      </ToDoDispatchContext.Provider>
    </ToDoStateContext.Provider>
  );
};

const useToDoState = () => {
  const context = React.useContext(ToDoStateContext);
  if (context === undefined)
    throw new Error("useToDoState must be used within a ToDoProvider");
  return context;
};

const useToDoDispatch = () => {
  const context = React.useContext(ToDoDispatchContext);
  if (context === undefined)
    throw new Error("useToDoDispatch must be used within a ToDoProvider");
  return context;
};

export { ToDoProvider, useToDoState, useToDoDispatch };
