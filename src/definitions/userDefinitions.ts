import User from "../models/User";

/**
 * The different types of actions for the UserContext.
 */
export enum UserActionTypes {
  "INITIALIZE_AUTH_ACTION",
  "SIGNUP_ACTION",
  "LOGIN_ACTION",
  "LOGIN_GOOGLE_ACTION",
  "SIGNOUT_ACTION"
}

/**
 * The structure of an action for the UserContext.
 */
export interface UserAction {
  type: UserActionTypes;
  payload: Partial<User>;
}

/**
 * The structure of a dispatcher for the UserContext.
 */
export type UserDispatcher = (action: UserAction) => void;

/**
 * The structure of a state for the UserContext.
 */
export interface UserState {
  user: Partial<User>;
}
