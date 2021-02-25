import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./Nav/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <div className="wrapper">
          <div>
            <h1>Hello World</h1>
          </div>

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
