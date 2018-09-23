import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import IndexPage from './components/IndexPage/IndexPage';
import UserPage from './components/UserPage/UserPage';
import OptionsPage from './components/OptionsPage/OptionsPage';

import CreatePage from './components/CreatePage/CreatePage';
import PendingPage from './components/PendingPage/PendingPage';
import FavoritesPage from './components/FavoritesPage/FavoritesPage';
import FillRequestsPage from './components/FillRequestsPage/FillRequestsPage'


import './styles/main.css';

const App = () => (
  <div>
    <Header title="The Loop" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />

        {/* Header Links */}
        <Route
          path="/index"
          component={IndexPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/user"
          component={UserPage}
        />
        <Route
          path="/options"
          component={OptionsPage}
        />

        {/* Footer Links */}
        <Route
          path="/create"
          component={CreatePage}
        />
        <Route
          path="/pending"
          component={PendingPage}
        />
        <Route
          path="/favorites"
          component={FavoritesPage}
        />
        <Route
          path="/fill"
          component={FillRequestsPage}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
