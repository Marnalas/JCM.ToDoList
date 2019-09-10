import {
  UserAction,
  UserActionTypes,
  UserDispatcher
} from "../../definitions/userDefinitions";
import { UserRepository } from "../../DAL/Repositories/userRepository";
import User from "../../models/user";
import { setError } from "../../definitions/errorDefinitions";

/**
 * Dispatches an action for database concerns.
 * @param dispatch The state dispatcher to use.
 */
const dispatchUserAction = (
  dispatch: UserDispatcher,
  successBehavior: () => void,
  errorBehavior: setError
) => {
  const userRepository = new UserRepository();
  return (action: UserAction) => {
    const dispatchAction = (user: Partial<User>) => {
      successBehavior();
      return dispatch({ ...action, payload: user });
    };
    switch (action.type) {
      case UserActionTypes.READ_SESSION_ACTION: {
        return userRepository.readSession()(dispatchAction, errorBehavior);
      }
      case UserActionTypes.SIGNUP_ACTION: {
        return userRepository.signUpUser(action.payload)(
          dispatchAction,
          errorBehavior
        );
      }
      case UserActionTypes.LOGIN_ACTION: {
        return userRepository.loginUser(action.payload)(
          dispatchAction,
          errorBehavior
        );
      }
      case UserActionTypes.LOGIN_GOOGLE_ACTION: {
        return userRepository.loginUserWithGoogle(action.payload)(
          dispatchAction,
          errorBehavior
        );
      }
      case UserActionTypes.SIGNOUT_ACTION: {
        return userRepository.signOutUser(action.payload)(
          dispatchAction,
          errorBehavior
        );
      }
      default: {
        return dispatch(action);
      }
    }
  };
};

export { dispatchUserAction as handleUserAction };
