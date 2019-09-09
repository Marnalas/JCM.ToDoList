import {
  ToDoAction,
  ToDoActionTypes,
  ToDoDispatcher
} from "../definitions/toDoDefinitions";
import { toDosCollection } from "../../database/firebase";

/**
 * Adds a ToDo item in the database.
 * @param addToDoAction The adding action to use.
 */
const addToDo = (addToDoAction: ToDoAction) => async (
  dispatch: ToDoDispatcher
) => {
  const addToDo = addToDoAction.payload[0];
  try {
    await toDosCollection.doc(addToDo.id).set({
      user: addToDo.user,
      order: addToDo.order,
      title: addToDo.title,
      description: addToDo.description
    });
    console.log(`addToDo OK ${addToDo.id}`);
  } catch (error) {
    console.log(`addToDo KO ${error.message}`);
  }
  return dispatch(addToDoAction);
};

/**
 * Removes the ToDo from the database as it is now done.
 * @param completeToDoAction The completing action to use.
 */
const completeToDo = (completeToDoAction: ToDoAction) => async (
  dispatch: ToDoDispatcher
) => {
  try {
    await toDosCollection.doc(completeToDoAction.payload[0].id).delete();
    console.log(`completeToDo OK ${completeToDoAction.payload[0].id}`);
  } catch (error) {
    console.log(`completeToDo KO ${error.message}`);
  }
  return dispatch(completeToDoAction);
};

/**
 * Retrieves all the ToDo items from the database.
 * @param fetchAction The fetching action.
 */
const fetchToDos = (fetchAction: ToDoAction) => async (
  dispatch: ToDoDispatcher
) => {
  try {
    const querySnapshot = await toDosCollection
      .where("user", "==", fetchAction.payload[0].user)
      .get();
    fetchAction.payload = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        user: doc.user,
        order: data.order,
        title: data.title,
        description: data.description,
        isDone: false
      };
    });
    console.log("fetchToDos OK");
  } catch (error) {
    console.log(`fetchToDos KO ${error.message}`);
  }
  return dispatch(fetchAction);
};

/**
 * Dispatches an action for database concerns.
 * @param dispatch The state dispatcher to use.
 */
const firebaseDispatchMiddleware = (dispatch: ToDoDispatcher) => {
  return (action: ToDoAction) => {
    switch (action.type) {
      case ToDoActionTypes.ADD_ACTION: {
        return addToDo(action)(dispatch);
      }
      case ToDoActionTypes.UPDATE_ACTION: {
        return addToDo(action)(dispatch);
      }
      case ToDoActionTypes.COMPLETE_ACTION: {
        return completeToDo(action)(dispatch);
      }
      case ToDoActionTypes.FETCH_ACTIONS: {
        return fetchToDos(action)(dispatch);
      }
      default: {
        return dispatch(action);
      }
    }
  };
};

export { firebaseDispatchMiddleware as handleToDoAction };
