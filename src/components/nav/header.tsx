import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import Connect from "../user/connect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { alertErrorBoundary } from "../errorBoundaries/alertErrorBoundary";

/**
 * A component for the website navigation.
 */
const Header: React.FC = () => {
  return (
    <header className="col-12 p-0 mb-3">
      <Navbar bg="success" variant="dark" className="d-flex">
        <Navbar.Brand href={window.location.href}>
          <FontAwesomeIcon icon={faPaperPlane} />
          {" Task force list"}
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Item>
            {React.createElement(alertErrorBoundary(Connect))}
          </Nav.Item>
        </Nav>
      </Navbar>
    </header>
  );
};

export default Header;
