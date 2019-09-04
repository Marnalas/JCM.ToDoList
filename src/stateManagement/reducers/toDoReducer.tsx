import {
  ToDoState,
  ToDoAction,
  ToDoActionTypes
} from "../definitions/toDoDefinitions";

const toDoReducer = (state: ToDoState, action: ToDoAction): ToDoState => {
  switch (action.type) {
    case ToDoActionTypes.ADD_ACTION: {
      return { toDos: [...state.toDos, action.payload[0]] };
    }
    case ToDoActionTypes.UPDATE_ACTION: {
      const toDoIndex = state.toDos
        .map(toDo => toDo.id)
        .indexOf(action.payload[0].id);
      return {
        toDos: [
          ...state.toDos.slice(0, toDoIndex),
          action.payload[0],
          ...state.toDos.slice(toDoIndex + 1, state.toDos.length)
        ]
      };
    }
    case ToDoActionTypes.COMPLETE_ACTION: {
      const toDoIndex = state.toDos
        .map(toDo => toDo.id)
        .indexOf(action.payload[0].id);
      return {
        toDos: [
          ...state.toDos.slice(0, toDoIndex),
          ...state.toDos.slice(toDoIndex + 1, state.toDos.length)
        ]
      };
    }
    case ToDoActionTypes.FETCH_ACTIONS: {
      return { toDos: [...action.payload] };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export default toDoReducer;
