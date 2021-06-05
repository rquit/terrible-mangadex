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
import NotLogged from "./comp/NotLoggedIn";
import LoggedIn from "./comp/LoggedIn";

function App() {
  const [cookies] = useCookies(["user"]);

  return (
    <CookiesProvider>
      <Router>
        <Switch>

          <Route exact path="/">
            {cookies.userAuth ? <LoggedIn /> : <HomePage />}
          </Route>

          <Route exact path="/manga">
            <Manga />
          </Route>

          <Route exact path="/mylist">
            {cookies.userAuth ? <MyList /> : <NotLogged />}
          </Route>
        </Switch>
      </Router>
    </CookiesProvider>
  );
}

export default App;
