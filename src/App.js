import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import HomePage from "./comp/HomePage";
import Manga from "./comp/Manga";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>

        <Route exact path="/manga">
          <Manga />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
