import { firebase, firebaseConfig } from "../firebase";
import User from "../../models/user";
import { setError } from "../../definitions/errorDefinitions";
import { isMobile } from "../../utils/deviceDetection";

/**
 * Exposes all the mecanisms to interact with the users.
 */
export class UserRepository {
  /**
   * Reads the session or the redirect auth result and logs in the user if possible.
   */
  initializeAuth = () => async (
    successBehavior: (user: User) => void,
    errorBehavior: setError
  ) => {
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
        console.log(`initializeAuth OK from session ${user.email}`);
      } else if (isMobile()) {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.SESSION);
        const res = await firebase.auth().getRedirectResult();
        if (res && res.user) {
          user.isAuthenticated = true;
          user.email = res.user.email;
          console.log(`initializeAuth OK from redirect ${user.email}`);
        } else console.log(`initializeAuth OK no session and no redirect`);
      } else console.log(`initializeAuth OK no session and no redirect`);
      successBehavior(user);
    } catch (error) {
      console.log(`readSession KO ${error.message}`);
      errorBehavior(true, error.message);
    }
  };

  /**
   * Registers the user then connects him.
   * @param user The user to register.
   */
  signUpUser = (user: Partial<User>) => async (
    successBehavior: (user: Partial<User>) => void,
    errorBehavior: setError
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
      successBehavior(user);
    } catch (error) {
      console.log(`signUpUser KO ${error.message}`);
      errorBehavior(true, error.message);
    }
  };

  /**
   * Signs the user in.
   * @param user The user to sign in.
   */
  loginUser = (user: Partial<User>) => async (
    successBehavior: (user: Partial<User>) => void,
    errorBehavior: setError
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
      successBehavior(user);
    } catch (error) {
      console.log(`loginUser KO ${error.message}`);
      errorBehavior(true, error.message);
    }
  };

  /**
   * Signs the user in using google.
   * @param user The user to sign in.
   */
  loginUserWithGoogle = (user: Partial<User>) => async (
    successBehavior: (user: Partial<User>) => void,
    errorBehavior: setError
  ) => {
    try {
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION);
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("email");
      if (!isMobile()) {
        const res = await firebase.auth().signInWithPopup(provider);
        if (res) {
          user.isAuthenticated = true;
          user.email = res.user.email;
          console.log(`loginUserWithGoogle OK ${user.email}`);
          successBehavior(user);
        }
      } else firebase.auth().signInWithRedirect(provider);
    } catch (error) {
      console.log(`loginUserWithGoogle KO ${error.message}`);
      errorBehavior(true, error.message);
    }
  };

  /**
   * Logs out the user.
   * @param user The user to log out.
   */
  signOutUser = (user: Partial<User>) => async (
    successBehavior: (user: Partial<User>) => void,
    errorBehavior: setError
  ) => {
    try {
      await firebase.auth().signOut();
      user = {
        isAuthenticated: false,
        email: "",
        password: ""
      };
      console.log(`signOutUser OK`);
      successBehavior(user);
    } catch (error) {
      console.log(`signOutUser KO ${error.message}`);
      errorBehavior(true, error.message);
    }
  };
}
