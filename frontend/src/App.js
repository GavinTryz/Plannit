import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CreateAccountPage from './pages/CreateAccountPage';
import Dashboard from './pages/Dashboard';

import SetWeekPage from './pages/SetWeekPage';
import ViewEventsPage from './pages/ViewEventsPage';
import InviteUserPage from './pages/InviteUserPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import EmailConfirmationPage from './pages/EmailConfirmationPage';
import ResetPasswordPage from './pages/ResetPasswordPage';


import TrialPage from './pages/TrialPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

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

      <Route path = '/dashboard/setWeek' exact>
        <SetWeekPage />
      </Route>

      <Route path = '/dashboard/viewEvents' >
        <ViewEventsPage />
      </Route>

      <Route path ='/forgotpassword' exact>
        <ForgotPasswordPage />
      </Route>

      <Route path = '/joinEvent'>
        <InviteUserPage />
      </Route>

      <Route path = '/verifyEmail'>
        <VerifyEmailPage />
      </Route>

      <Route path='/emailConfirmation'>
        <EmailConfirmationPage />
      </Route>

      <Route path='/resetPassword'>
        <ResetPasswordPage />
      </Route>

      </Switch>
    </Router>
  );
}

export default App;
