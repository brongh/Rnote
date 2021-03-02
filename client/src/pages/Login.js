import React, { useState } from "react";
import { Button, Form, NavLink } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useForm } from "react-hook-form";
import { loginUser } from "../api/axiosCall";
import { useAuthDispatch, useAuthState } from "../context/context";
import { useHistory } from "react-router";
import { errorMsg } from "../components/style";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const [loginError, setLoginError] = useState("");

  const history = useHistory();
  const dispatch = useAuthDispatch();
  // const { errorMessage } = useAuthState();

  const onSubmit = async (data) => {
    try {
      let res = await loginUser(dispatch, data);
      if (res.access) {
        history.push("/main");
      } else if (res.detail) {
        setLoginError(res.detail);
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="signlogdiv">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ borderBottom: "0.2px solid black" }}>
          <h3>Log In</h3>
        </div>
        <Form.Group controlId="username" style={{ marginTop: "10px" }}>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            name="username"
            ref={register({ required: true })}
          />
        </Form.Group>
        {errors.username && <p style={errorMsg}>Username is required</p>}

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            ref={register({ required: true })}
          />
        </Form.Group>
        {errors.password && <p style={errorMsg}>Password is required</p>}
        {loginError && <p style={errorMsg}>{loginError}</p>}

        <Button variant="primary" type="submit">
          Login
        </Button>
        <div>
          <LinkContainer to="/signup">
            <NavLink>
              <span style={{ fontSize: "18px" }}>Create an account</span>
            </NavLink>
          </LinkContainer>
        </div>
      </Form>
    </div>
  );
};

export default Login;
