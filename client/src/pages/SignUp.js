import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { signUp } from "../api/axiosCall";

const SignUp = () => {
  const { register, handleSubmit } = useForm();

  const history = useHistory();

  const onSubmit = async (data) => {
    let res = await signUp(data);
    if (res.data) {
      history.push("/login");
    }
  };

  return (
    <div className="container">
      <div className="signlogdiv">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="username"
              name="username"
              ref={register({ required: true })}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              ref={register({ required: true })}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Create Account
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
