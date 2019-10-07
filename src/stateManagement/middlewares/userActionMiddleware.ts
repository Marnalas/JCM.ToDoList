import {
  UserAction,
  UserActionTypes,
  UserDispatcher
} from "../../definitions/userDefinitions";
import { UserRepository } from "../../DAL/Repositories/UserRepository";
import User from "../../models/User";
import { setError } from "../../definitions/errorDefinitions";

/**
 * Dispatches an action for database concerns.
 * @param dispatch The state dispatcher to use.
 */
const userActionMiddleware = (dispatch: UserDispatcher) => {
  const userRepository = new UserRepository();
  return (
    action: UserAction,
    successCallback: () => void,
    errorCallback: setError
  ) => {
    const dispatchAction = (user: Partial<User>) => {
      successCallback();
      return dispatch({ ...action, payload: user });
    };
    switch (action.type) {
      case UserActionTypes.INITIALIZE_AUTH_ACTION: {
        return userRepository.initializeAuth(dispatchAction, errorCallback);
      }
      case UserActionTypes.SIGNUP_ACTION: {
        return userRepository.signUpUser(
          action.payload,
          dispatchAction,
          errorCallback
        );
      }
      case UserActionTypes.LOGIN_ACTION: {
        return userRepository.loginUser(
          action.payload,
          dispatchAction,
          errorCallback
        );
      }
      case UserActionTypes.LOGIN_GOOGLE_ACTION: {
        return userRepository.loginUserWithGoogle(
          action.payload,
          dispatchAction,
          errorCallback
        );
      }
      case UserActionTypes.SIGNOUT_ACTION: {
        return userRepository.signOutUser(
          action.payload,
          dispatchAction,
          errorCallback
        );
      }
      default: {
        return dispatch(action);
      }
    }
  };
};

export { userActionMiddleware as handleUserAction };
