import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage.js';
import CreateAccountPage from './pages/CreateAccountPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router >
      <Switch>

      <Route path = '/' exact>
        <HomePage />
      </Route>

      <Route path = '/about' exact>
        <AboutPage />
      </Route>

      <Route path = '/login' exact>
        <LoginPage />
      </Route>

      <Route path = '/createaccount' exact>
        <CreateAccountPage />
      </Route>

      <Route path = '/dashboard' exact>
        <Dashboard />
      </Route>
       
      </Switch>
    </Router>
  );
}

export default App;