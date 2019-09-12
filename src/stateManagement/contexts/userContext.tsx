import React from "react";
import {
  UserDispatcher,
  UserState,
  UserAction,
  UserActionTypes
} from "../../definitions/userDefinitions";

/*
This splitting is from this article https://kentcdodds.com/blog/how-to-use-react-context-effectively.
It is not by no means necessary in this situation but I wished to try it and learn how to use it as it can be very helpful.
*/
const UserStateContext = React.createContext<UserState | undefined>(undefined);
const UserDispatchContext = React.createContext<UserDispatcher | undefined>(
  undefined
);

/**
 * Updates the state with a specific action.
 * @param state The state to update.
 * @param action The action to update the update with.
 */
const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionTypes.INITIALIZE_AUTH_ACTION:
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

interface UserProviderProps {
  children: React.ReactNode;
}
/**
 * The provider component for the UserContext.
 * @param param0 The object containing the children of the component.
 */
export const UserProvider = ({ children }: UserProviderProps) => {
  const [state, dispatch] = React.useReducer(userReducer, {
    user: { isAuthenticated: false, email: "", password: "" }
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

/**
 * Returns the state for the UserContext.
 */
export const useUserState = () => {
  const context = React.useContext(UserStateContext);
  if (context === undefined)
    throw new Error("useUserState must be used within a UserProvider");
  return context;
};

/**
 * Returns the dispatch for the UserContext.
 */
export const useUserDispatch = () => {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined)
    throw new Error("useUserDispatch must be used within a UserProvider");
  return context;
};
