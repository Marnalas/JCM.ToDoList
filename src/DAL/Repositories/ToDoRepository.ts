import { toDosCollection } from "../firebase";
import ToDo from "../../models/ToDo";
import { setError } from "../../definitions/errorDefinitions";

/**
 * Exposes all the mecanisms to interact with the ToDo items.
 */
export class ToDoRepository {
  /**
   * Saves a ToDo item in the database.
   * @param successCallback The callback when success.
   * @param errorCallback The callback when an error occurres.
   */
  saveToDo = async (
    addToDo: ToDo,
    successCallback: (toDo: ToDo) => void,
    errorCallback: setError
  ) => {
    try {
      await toDosCollection.doc(addToDo.id).set({
        user: addToDo.user,
        order: addToDo.order,
        title: addToDo.title,
        description: addToDo.description
      });
      successCallback(addToDo);
    } catch (error) {
      errorCallback(true, error.message);
    }
  };

  /**
   * Removes the ToDo from the database as it is now done.
   * @param completeToDo The ToDo item to complete.
   * @param successCallback The callback when success.
   * @param errorCallback The callback when an error occurres.
   */
  completeToDo = async (
    completeToDo: ToDo,
    successCallback: (toDo: ToDo) => void,
    errorCallback: setError
  ) => {
    try {
      await toDosCollection.doc(completeToDo.id).delete();
      successCallback(completeToDo);
    } catch (error) {
      errorCallback(true, error.message);
    }
  };

  /**
   * Retrieves all the ToDo items of a user from the database.
   * @param email The email of the user.
   * @param successCallback The callback when success.
   * @param errorCallback The callback when an error occurres.
   */
  fetchToDos = async (
    email: string,
    successCallback: (toDos: ToDo[]) => void,
    errorCallback: setError
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
      successCallback(toDos);
    } catch (error) {
      errorCallback(true, error.message);
    }
  };
}
