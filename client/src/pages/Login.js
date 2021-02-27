import React from "react";
import { Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useForm } from "react-hook-form";
import { loginUser } from "../api/axiosCall";
import { useAuthState, useAuthDispatch } from "../context/context";
import { useHistory } from "react-router";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const history = useHistory();
  const dispatch = useAuthDispatch();

  const onSubmit = async (data) => {
    let res = await loginUser(dispatch, data);
    if (res.access) {
      history.push("/main");
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            name="username"
            ref={register}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            ref={register}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
        <div>
          <LinkContainer to="/signup">
            <a>Sign Up</a>
          </LinkContainer>
        </div>
      </Form>
    </div>
  );
};

export default Login;
