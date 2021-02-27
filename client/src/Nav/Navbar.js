import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAuthState, useAuthDispatch } from "../context/context";
import { logout } from "../api/axiosCall";
import { useHistory } from "react-router-dom";

const NavBar = () => {
  const dispatch = useAuthDispatch();
  const userDetail = useAuthState();
  const history = useHistory();

  const handleLogout = () => {
    logout(dispatch);
    history.push("/");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <LinkContainer to="/">
          <Navbar.Brand>Rnote</Navbar.Brand>
        </LinkContainer>
        <Nav className="mr-auto">
          {userDetail.token ? (
            <>
              <LinkContainer to="/main">
                <Nav.Link>Your Notes</Nav.Link>
              </LinkContainer>
            </>
          ) : null}
        </Nav>
        {userDetail.token ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <>
            <LinkContainer to="/login">
              <Button>Login</Button>
            </LinkContainer>
            <LinkContainer to="/signup">
              <Button>Sign Up</Button>
            </LinkContainer>
          </>
        )}
      </Navbar>
    </>
  );
};

export default NavBar;
