import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const NavBar = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <LinkContainer to="/">
          <Navbar.Brand>Rnote</Navbar.Brand>
        </LinkContainer>
        <Nav className="mr-auto">
          <LinkContainer to="/main">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
        </Nav>
        <LinkContainer to="/login">
          <Button>Login</Button>
        </LinkContainer>
        <LinkContainer to="/signup">
          <Button>Sign Up</Button>
        </LinkContainer>
        <LinkContainer to="/">
          <Button>Logout</Button>
        </LinkContainer>
      </Navbar>
    </>
  );
};

export default NavBar;
