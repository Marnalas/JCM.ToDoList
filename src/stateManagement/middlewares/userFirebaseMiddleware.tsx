import { firebase, firebaseConfig } from "../../database/firebase";
import {
  UserAction,
  UserActionTypes,
  UserDispatcher
} from "../definitions/userDefinitions";

/**
 * Reads the session and logs in the user if possible.
 * @param action The signing up action to use.
 */
const readSession = (action: UserAction) => async (
  dispatch: UserDispatcher
) => {
  try {
    const userString = window.sessionStorage.getItem(
      `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
    );
    if (userString) {
      const user = JSON.parse(userString);
      action.payload.isAuthenticated = true;
      action.payload.email = user.email;
      console.log(`readSession OK ${action.payload.email}`);
    }
  } catch (error) {
    console.log(`readSession KO ${error.message}`);
  }
  return dispatch(action);
};

/**
 * Registers the user then connects him.
 * @param action The signing up action to use.
 */
const signUpUser = (action: UserAction) => async (dispatch: UserDispatcher) => {
  try {
    await firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION);
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(
        action.payload.email,
        action.payload.password
      );
    if (res) {
      action.payload.isAuthenticated = true;
      action.payload.password = "";
    }
    console.log(`signUpUser OK ${action.payload.email}`);
  } catch (error) {
    console.log(`signUpUser KO ${error.message}`);
  }
  return dispatch(action);
};

/**
 * Signs the user in.
 * @param action The signing in action to use.
 */
const loginUser = (action: UserAction) => async (dispatch: UserDispatcher) => {
  try {
    await firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION);
    const res = await firebase
      .auth()
      .signInWithEmailAndPassword(
        action.payload.email,
        action.payload.password
      );
    if (res) {
      action.payload.isAuthenticated = true;
      action.payload.password = "";
    }
    console.log(`loginUser OK ${action.payload.email}`);
  } catch (error) {
    console.log(`loginUser KO ${error.message}`);
  }
  return dispatch(action);
};

/**
 * Signs the user in using google.
 * @param action The signing in action to use.
 */
const loginUserWithGoogle = (action: UserAction) => async (
  dispatch: UserDispatcher
) => {
  try {
    await firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION);
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("email");
    const res = await firebase.auth().signInWithPopup(provider);
    if (res) {
      action.payload.isAuthenticated = true;
      action.payload.email = res.user.email;
      console.log(`loginUserWithGoogle OK ${action.payload.email}`);
    }
  } catch (error) {
    console.log(`loginUserWithGoogle KO ${error.message}`);
  }
  return dispatch(action);
};

/**
 * Logs out the user.
 * @param action The signing out action to use.
 */
const signOutUser = (action: UserAction) => async (
  dispatch: UserDispatcher
) => {
  try {
    await firebase.auth().signOut();
    console.log(`signOutUser OK ${action.payload.email}`);
    action.payload = {
      isAuthenticated: false,
      email: "",
      password: "",
      token: ""
    };
  } catch (error) {
    console.log(`signOutUser KO ${error.message}`);
  }
  return dispatch(action);
};

/**
 * Dispatches an action for database concerns.
 * @param dispatch The state dispatcher to use.
 */
const firebaseDispatchMiddleware = (dispatch: UserDispatcher) => {
  return (action: UserAction) => {
    switch (action.type) {
      case UserActionTypes.READ_SESSION_ACTION: {
        return readSession(action)(dispatch);
      }
      case UserActionTypes.SIGNUP_ACTION: {
        return signUpUser(action)(dispatch);
      }
      case UserActionTypes.LOGIN_ACTION: {
        return loginUser(action)(dispatch);
      }
      case UserActionTypes.LOGIN_GOOGLE_ACTION: {
        return loginUserWithGoogle(action)(dispatch);
      }
      case UserActionTypes.SIGNOUT_ACTION: {
        return signOutUser(action)(dispatch);
      }
      default: {
        return dispatch(action);
      }
    }
  };
};

export { firebaseDispatchMiddleware as handleUserAction };
