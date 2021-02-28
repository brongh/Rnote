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

const App = () => {
  const dispatch = useAuthDispatch();
  const userDetails = useAuthState();

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
