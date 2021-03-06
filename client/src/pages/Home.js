import React from "react";
import { Button, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { homeButtonStyle, homeCardStyle } from "../components/style";
import { useAuthState } from "../context/context";

const Home = () => {
  const userDetails = useAuthState();
  return (
    <div>
      {!userDetails.token ? (
        <>
          <Card
            className="text-center bg-dark text-white"
            style={homeCardStyle}
          >
            <Card.Header>Probably the simplest note app ever</Card.Header>
            <Card.Body>
              <Card.Title>Please Sign up or Log in</Card.Title>
              <LinkContainer style={homeButtonStyle} to="/login">
                <Button variant="primary">Log In</Button>
              </LinkContainer>
              <LinkContainer style={homeButtonStyle} to="/signup">
                <Button variant="primary">Sign Up</Button>
              </LinkContainer>
            </Card.Body>
          </Card>
        </>
      ) : (
        <>
          <Card>
            <Card.Body>
              <Card.Title>You are logged in</Card.Title>
              <LinkContainer to="/main">
                <Button variant="primary">Go to Notes</Button>
              </LinkContainer>
            </Card.Body>
          </Card>
        </>
      )}
    </div>
  );
};

export default Home;
