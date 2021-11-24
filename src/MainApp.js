import React from "react";
import { Switch, Route } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import Register from "./Register";

const MainApp = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Register} />
        <Route exact path="/app" component={App} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  );
};

export default MainApp;
