import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { CookiesProvider, useCookies } from 'react-cookie';

import './App.css';
import HomePage from "./comp/HomePage";
import Manga from "./comp/Manga";
import MyList from "./comp/MyList";

function App() {

  return (
    <CookiesProvider>
      <Router>
        <Switch>

          <Route exact path="/">
            <HomePage />
          </Route>

          <Route exact path="/manga">
            <Manga />
          </Route>

          <Route exact path="/mylist">
            <MyList />
          </Route>
        </Switch>
      </Router>
    </CookiesProvider>
  );
}

export default App;
