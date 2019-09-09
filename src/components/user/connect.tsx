import { Button, Row, Col, Popover, Container, Overlay } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import React, { useState, useRef, useEffect } from "react";
import { handleUserAction } from "../../stateManagement/middlewares/userFirebaseMiddleware";
import {
  useUserDispatch,
  useUserState
} from "../../stateManagement/contexts/userContext";
import { UserActionTypes } from "../../stateManagement/definitions/userDefinitions";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

/**
 * A component to handle the connection of the user.
 */
const Connect: React.FC = () => {
  const state = useUserState();
  const dispatch = useUserDispatch();

  // The local state to toogle the overlay display.
  const [overlayState, setOverlayState] = useState(false);

  const mailInput = useRef(null);
  const passwordInput = useRef(null);
  const overlayTarget = useRef(null);

  useEffect(() => {
    handleUserAction(dispatch)({
      type: UserActionTypes.READ_SESSION_ACTION,
      payload: []
    });
  }, [dispatch]);

  /**
   * Toggles the overlay display.
   */
  const toggleOverlay = () => {
    setOverlayState(!overlayState);
  };

  /**
   * Registers the user.
   */
  const register = () => {
    toggleOverlay();
    handleUserAction(dispatch)({
      type: UserActionTypes.SIGNUP_ACTION,
      payload: {
        email: (mailInput.current || { value: "" }).value,
        password: (passwordInput.current || { value: "" }).value
      }
    });
  };

  /**
   * Connects the user.
   * @param actionType The logging action to use.
   */
  const connect = (actionType: UserActionTypes) => {
    toggleOverlay();
    handleUserAction(dispatch)({
      type: actionType,
      payload: {
        email: (mailInput.current || { value: "" }).value,
        password: (passwordInput.current || { value: "" }).value
      }
    });
  };

  /**
   * Disconnects the user.
   */
  const signOut = () => {
    toggleOverlay();
    handleUserAction(dispatch)({
      type: UserActionTypes.SIGNOUT_ACTION,
      payload: {
        isAuthenticated: false,
        email: "",
        password: "",
        token: ""
      }
    });
  };

  return (
    <>
      <Button
        variant="light"
        className="btn"
        onClick={toggleOverlay}
        ref={overlayTarget}
      >
        {!state.user.isAuthenticated ? "Connect" : "My account"}
      </Button>
      <Overlay
        show={overlayState}
        placement="bottom-end"
        target={overlayTarget.current}
      >
        {!state.user.isAuthenticated ? (
          <Popover id="connectPopover" className="border-success">
            <Popover.Title
              as="h3"
              className="text-success text-break border-success"
            >
              Connect to your task list
            </Popover.Title>
            <Popover.Content>
              <Container fluid>
                <Row className="mb-2">
                  <Col xs={12}>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      ref={mailInput}
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={12}>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      ref={passwordInput}
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={12} className="d-flex flex-row-reverse">
                    <Button
                      id="register"
                      variant="link"
                      className="text-success"
                      onClick={register}
                    >
                      Sign up
                    </Button>
                    <Button
                      id="connect"
                      variant="link"
                      className="text-success"
                      onClick={() => connect(UserActionTypes.LOGIN_ACTION)}
                    >
                      Log in
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} className="d-flex">
                    <Button
                      className="btn flex-fill"
                      variant="outline-success"
                      onClick={() =>
                        connect(UserActionTypes.LOGIN_GOOGLE_ACTION)
                      }
                    >
                      <FontAwesomeIcon icon={faGoogle} /> Log in using Google
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Popover.Content>
          </Popover>
        ) : (
          <Popover id="connectPopover" className="border-success">
            <Popover.Title
              as="h3"
              className="text-success text-break border-success"
            >
              {state.user.email}
            </Popover.Title>
            <Popover.Content>
              <Container fluid>
                <Row>
                  <Col xs={12}>
                    <Button
                      className="btn"
                      variant="outline-success"
                      onClick={signOut}
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} /> Sign out
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Popover.Content>
          </Popover>
        )}
      </Overlay>
    </>
  );
};

export default Connect;
