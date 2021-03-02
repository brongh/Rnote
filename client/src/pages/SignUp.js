import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { signUp } from "../api/axiosCall";
import { errorMsg } from "../components/style";
import { masterKey } from "../encryption/masterkey";

const SignUp = () => {
  const { register, handleSubmit, errors } = useForm();
  const [err, setErr] = useState("");

  const history = useHistory();

  const onSubmit = async (data) => {
    try {
      const key = data.password;
      const mk = await masterKey(key);
      const input = { mk: JSON.stringify(mk), ...data };
      let res = await signUp(input);
      console.log(res);
      if (res.data) {
        history.push("/login");
      } else if (res.username) {
        setErr(res.username);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="signlogdiv">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ borderBottom: "0.2px solid black" }}>
            <h3>Sign Up Form</h3>
          </div>
          <Form.Group controlId="username" style={{ marginTop: "10px" }}>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="username"
              name="username"
              ref={register({ required: true })}
            />
          </Form.Group>
          {errors.username && <p style={errorMsg}>Username is required</p>}
          {err && <p style={errorMsg}>{err}</p>}
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              ref={register({ required: true })}
            />
          </Form.Group>
          {errors.username && <p style={errorMsg}>Password is required</p>}

          <Button variant="primary" type="submit">
            Create Account
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
