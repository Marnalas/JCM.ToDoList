import { firebase, firebaseConfig } from "../firebase";
import User from "../../models/User";
import { setError } from "../../definitions/errorDefinitions";
import { isMobile } from "../../utils/deviceDetection";

/**
 * Exposes all the mecanisms to interact with the users.
 */
export class UserRepository {
  /**
   * Reads the session or the redirect auth result and logs in the user if possible.
   * @param successCallback The callback when success.
   * @param errorCallback The callback when an error occurres.
   */
  initializeAuth = async (
    successCallback: (user: User) => void,
    errorCallback: setError
  ) => {
    const user = {
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
      } else {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.SESSION);
        const res = await firebase.auth().getRedirectResult();
        if (res && res.user) {
          user.isAuthenticated = true;
          user.email = res.user.email;
        }
      }
      successCallback(user);
    } catch (error) {
      console.log(`readSession KO ${error.message}`);
      errorCallback(true, error.message);
    }
  };

  /**
   * Registers the user then connects him.
   * @param user The user to register.
   * @param successCallback The callback when success.
   * @param errorCallback The callback when an error occurres.
   */
  signUpUser = async (
    user: Partial<User>,
    successCallback: (user: Partial<User>) => void,
    errorCallback: setError
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
      successCallback(user);
    } catch (error) {
      errorCallback(true, error.message);
    }
  };

  /**
   * Signs the user in.
   * @param user The user to sign in.
   * @param successCallback The callback when success.
   * @param errorCallback The callback when an error occurres.
   */
  loginUser = async (
    user: Partial<User>,
    successCallback: (user: Partial<User>) => void,
    errorCallback: setError
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
      successCallback(user);
    } catch (error) {
      errorCallback(true, error.message);
    }
  };

  /**
   * Signs the user in using google.
   * @param user The user to sign in.
   * @param successCallback The callback when success.
   * @param errorCallback The callback when an error occurres.
   */
  loginUserWithGoogle = async (
    user: Partial<User>,
    successCallback: (user: Partial<User>) => void,
    errorCallback: setError
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
          successCallback(user);
        }
      } else firebase.auth().signInWithRedirect(provider);
    } catch (error) {
      errorCallback(true, error.message);
    }
  };

  /**
   * Logs out the user.
   * @param user The user to log out.
   * @param successCallback The callback when success.
   * @param errorCallback The callback when an error occurres.
   */
  signOutUser = async (
    user: Partial<User>,
    successCallback: (user: Partial<User>) => void,
    errorCallback: setError
  ) => {
    try {
      await firebase.auth().signOut();
      user = {
        isAuthenticated: false,
        email: "",
        password: ""
      };
      successCallback(user);
    } catch (error) {
      errorCallback(true, error.message);
    }
  };
}
