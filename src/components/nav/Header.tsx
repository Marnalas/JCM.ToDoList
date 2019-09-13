import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import Connect from "../user/Connect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { withAlertErrorBoundary } from "../errorBoundaries/withAlertErrorBoundary";

/**
 * A component for the website navigation.
 */
const Header: React.FC = () => {
  const ConnectWithAlertError = withAlertErrorBoundary(Connect);
  return (
    <header className="col-12 p-0 mb-3">
      <Navbar bg="success" variant="dark" className="d-flex">
        <Navbar.Brand href={window.location.href}>
          <FontAwesomeIcon icon={faPaperPlane} />
          {" Task force list"}
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Item>
            <ConnectWithAlertError />
          </Nav.Item>
        </Nav>
      </Navbar>
    </header>
  );
};

export default Header;
