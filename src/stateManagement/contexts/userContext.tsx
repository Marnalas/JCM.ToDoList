import React from "react";
import { UserDispatcher, UserState } from "../definitions/userDefinitions";
import userReducer from "../reducers/userReducer";

/*
This splitting is from this article https://kentcdodds.com/blog/how-to-use-react-context-effectively.
It is not by no means necessary in this situation but I wished to try it and learn how to use it as it can be very helpful.
*/
const UserStateContext = React.createContext<UserState | undefined>(undefined);
const UserDispatchContext = React.createContext<UserDispatcher | undefined>(
  undefined
);

interface UserProviderProps {
  children: React.ReactNode;
}
/**
 * The provider component for the UserContext.
 * @param param0 The object containing the children of the component.
 */
const UserProvider = ({ children }: UserProviderProps) => {
  const [state, dispatch] = React.useReducer(userReducer, {
    user: { isAuthenticated: false, email: "", password: "", token: "" }
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
const useUserState = () => {
  const context = React.useContext(UserStateContext);
  if (context === undefined)
    throw new Error("useUserState must be used within a UserProvider");
  return context;
};

/**
 * Returns the dispatch for the UserContext.
 */
const useUserDispatch = () => {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined)
    throw new Error("useUserDispatch must be used within a UserProvider");
  return context;
};

export { UserProvider, useUserState, useUserDispatch };
