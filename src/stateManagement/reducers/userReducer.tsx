import {
  UserState,
  UserAction,
  UserActionTypes
} from "../definitions/userDefinitions";

/**
 * Updates the state with a specific action.
 * @param state The state to update.
 * @param action The action to update the update with.
 */
const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionTypes.READ_SESSION_ACTION:
    case UserActionTypes.SIGNUP_ACTION:
    case UserActionTypes.LOGIN_ACTION:
    case UserActionTypes.LOGIN_GOOGLE_ACTION:
    case UserActionTypes.SIGNOUT_ACTION: {
      return { user: action.payload };
    }
    default: {
      throw new Error(`userReducer : unhandled action type: ${action.type}`);
    }
  }
};

export default userReducer;
