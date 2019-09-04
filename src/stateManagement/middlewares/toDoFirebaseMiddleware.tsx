import {
  ToDoAction,
  ToDoActionTypes,
  ToDoDispatcher
} from "../definitions/toDoDefinitions";
import { toDosCollection } from "../../database/firebase";

const addToDo = (addToDoAction: ToDoAction) => async (
  dispatch: ToDoDispatcher
) => {
  const addToDo = addToDoAction.payload[0];
  toDosCollection
    .doc(addToDo.id)
    .set({
      order: addToDo.order,
      title: addToDo.title,
      description: addToDo.description
    })
    .then(() => {
      console.log(`addToDo OK ${addToDo.id}`);
    })
    .catch(error => {
      console.log(`addToDo KO ${error.message}`);
    });
  return dispatch(addToDoAction);
};

const completeToDo = (completeToDoAction: ToDoAction) => async (
  dispatch: ToDoDispatcher
) => {
  toDosCollection
    .doc(completeToDoAction.payload[0].id)
    .delete()
    .then(() => {
      console.log(`completeToDo OK ${completeToDoAction.payload[0].id}`);
    })
    .catch(error => {
      console.log(`completeToDo KO ${error.message}`);
    });
  return dispatch(completeToDoAction);
};

const fetchToDos = (fetchAction: ToDoAction) => async (
  dispatch: ToDoDispatcher
) => {
  // console.log("fetch toDos");
  toDosCollection
    .get()
    .then(querySnapshot => {
      console.log("fetchToDos OK");
      fetchAction.payload = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          order: data.order,
          title: data.title,
          description: data.description,
          isDone: false
        };
      });
      return dispatch(fetchAction);
    })
    .catch(error => {
      console.log(`fetchToDos KO ${error.message}`);
    });
};

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
