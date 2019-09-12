import { toDosCollection } from "../firebase";
import ToDo from "../../models/toDo";
import { setError } from "../../definitions/errorDefinitions";

/**
 * Exposes all the mecanisms to interact with the ToDo items.
 */
export class ToDoRepository {
  /**
   * Saves a ToDo item in the database.
   * @param addToDo The ToDo item to save.
   */
  saveToDo = (addToDo: ToDo) => async (
    successBehavior: (toDo: ToDo) => void,
    errorBehavior: setError
  ) => {
    try {
      await toDosCollection.doc(addToDo.id).set({
        user: addToDo.user,
        order: addToDo.order,
        title: addToDo.title,
        description: addToDo.description
      });
      successBehavior(addToDo);
    } catch (error) {
      errorBehavior(true, error.message);
    }
  };

  /**
   * Removes the ToDo from the database as it is now done.
   * @param completeToDo The ToDo item to complete.
   */
  completeToDo = (completeToDo: ToDo) => async (
    successBehavior: (toDo: ToDo) => void,
    errorBehavior: setError
  ) => {
    try {
      await toDosCollection.doc(completeToDo.id).delete();
      successBehavior(completeToDo);
    } catch (error) {
      errorBehavior(true, error.message);
    }
  };

  /**
   * Retrieves all the ToDo items of a user from the database.
   * @param email The email of the user.
   */
  fetchToDos = (email: string) => async (
    successBehavior: (toDos: ToDo[]) => void,
    errorBehavior: setError
  ) => {
    let toDos;
    try {
      const querySnapshot = await toDosCollection
        .where("user", "==", email)
        .get();
      toDos = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          user: data.user,
          order: data.order,
          title: data.title,
          description: data.description,
          isDone: false
        };
      });
      successBehavior(toDos);
    } catch (error) {
      errorBehavior(true, error.message);
    }
  };
}
