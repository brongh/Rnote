import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./Nav/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Main from "./pages/Main";
import { useAuthDispatch, useAuthState } from "./context/context";
import { getAccessToken } from "./api/axiosCall";
import React, { useEffect } from "react";
const crypto = require("crypto");

const App = () => {
  const dispatch = useAuthDispatch();
  const userDetails = useAuthState();

  function str2buf(str) {
    return new TextEncoder("utf-8").encode(str);
  }

  function deriveKey(passphrase, salt) {
    const arr = new Uint8Array(8);
    salt = salt || crypto.getRandomValues(arr);
    return crypto.subtle
      .importKey("raw", str2buf(passphrase), "PBKDF2", false, ["deriveKey"])
      .then((key) =>
        crypto.subtle.deriveKey(
          { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
          key,
          { name: "AES-GCM", length: 256 },
          false,
          ["encrypt", "decrypt"]
        )
      )
      .then((key) => [key, salt]);
  }

  const nice = deriveKey("hi");

  useEffect(() => {
    getAccessToken(dispatch);
  }, []);

  return (
    <div className="backgd">
      <Router>
        <NavBar />
        <div className="wrapper">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            {userDetails.token ? (
              <Route path="/main">
                <Main />
              </Route>
            ) : null}
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
