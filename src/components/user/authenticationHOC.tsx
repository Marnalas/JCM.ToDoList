import {
  useUserState,
  useUserDispatch
} from "../../stateManagement/contexts/userContext";
import { useEffect, useRef } from "react";
import { UserActionTypes } from "../../definitions/userDefinitions";
import { handleUserAction } from "../../stateManagement/middlewares/userFirebaseMiddleware";
import User from "../../models/user";
import React from "react";

/**
 * A component to ensure the user authentication.
 * Implements the HOC pattern. Useless in addition of the useReduser hook.
 * Only implemented to learn the HOC pattern.
 * @param WrappedComponent The component that requires the authentication.
 */
const authenticationWrapper = (
  WrappedComponent: React.FC<Partial<User>>
): React.FC<Partial<User>> => () => {
  const state = useUserState();
  const dispatch = useUserDispatch();
  let isSessionReading = useRef(false);

  useEffect(() => {
    if (!isSessionReading.current && !state.user.isAuthenticated) {
      isSessionReading.current = true;
      handleUserAction(dispatch)({
        type: UserActionTypes.READ_SESSION_ACTION,
        payload: {}
      });
    }
  }, [dispatch, state.user.isAuthenticated]);

  return (
    <WrappedComponent
      isAuthenticated={state.user.isAuthenticated}
      email={state.user.email}
    />
  );
};

export default authenticationWrapper;
