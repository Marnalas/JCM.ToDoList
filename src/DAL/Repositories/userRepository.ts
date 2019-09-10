import { firebase, firebaseConfig } from "../firebase";
import User from "../../models/user";

/**
 * Exposes all the mecanisms to interact with the users.
 */
export class UserRepository {
  /**
   * Reads the session and logs in the user if possible.
   */
  readSession = () => async (successBehavior: (user: User) => void) => {
    let user = {
      isAuthenticated: false,
      email: "",
      password: ""
    };
    try {
      const userString = window.sessionStorage.getItem(
        `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
      );
      if (userString) {
        const userObj = JSON.parse(userString);
        user.isAuthenticated = true;
        user.email = userObj.email;
        console.log(`readSession OK ${user.email}`);
      } else console.log(`readSession OK no session`);
    } catch (error) {
      console.log(`readSession KO ${error.message}`);
    }
    return successBehavior(user);
  };

  /**
   * Registers the user then connects him.
   * @param user The user to register.
   */
  signUpUser = (user: Partial<User>) => async (
    successBehavior: (user: Partial<User>) => void
  ) => {
    try {
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION);
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);
      if (res) {
        user.isAuthenticated = true;
        user.password = "";
      }
      console.log(`signUpUser OK ${user.email}`);
    } catch (error) {
      console.log(`signUpUser KO ${error.message}`);
    }
    return successBehavior(user);
  };

  /**
   * Signs the user in.
   * @param user The user to sign in.
   */
  loginUser = (user: Partial<User>) => async (
    successBehavior: (user: Partial<User>) => void
  ) => {
    try {
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION);
      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password);
      if (res) {
        user.isAuthenticated = true;
        user.password = "";
      }
      console.log(`loginUser OK ${user.email}`);
    } catch (error) {
      console.log(`loginUser KO ${error.message}`);
    }
    return successBehavior(user);
  };

  /**
   * Signs the user in using google.
   * @param user The user to sign in.
   */
  loginUserWithGoogle = (user: Partial<User>) => async (
    successBehavior: (user: Partial<User>) => void
  ) => {
    try {
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION);
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("email");
      const res = await firebase.auth().signInWithPopup(provider);
      if (res) {
        user.isAuthenticated = true;
        user.email = res.user.email;
        console.log(`loginUserWithGoogle OK ${user.email}`);
      }
    } catch (error) {
      console.log(`loginUserWithGoogle KO ${error.message}`);
    }
    return successBehavior(user);
  };

  /**
   * Logs out the user.
   * @param user The user to log out.
   */
  signOutUser = (user: Partial<User>) => async (
    successBehavior: (user: Partial<User>) => void
  ) => {
    try {
      await firebase.auth().signOut();
      user = {
        isAuthenticated: false,
        email: "",
        password: ""
      };
      console.log(`signOutUser OK`);
    } catch (error) {
      console.log(`signOutUser KO ${error.message}`);
    }
    return successBehavior(user);
  };
}
