import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

/**
 * A component for the website navigation.
 */
const Header: React.FC = () => {
  return (
    <header className="col-12 p-0 mb-3">
      <Navbar bg="success" variant="dark" className="d-flex">
        <Navbar.Brand>
          <FontAwesomeIcon icon={faPaperPlane} />
          {" Task force list"}
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Item>
            <Button variant="light">Connect</Button>
          </Nav.Item>
        </Nav>
      </Navbar>
    </header>
  );
};

export default Header;