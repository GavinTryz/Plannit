import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CreateAccountPage from './pages/CreateAccountPage';
import Dashboard from './pages/Dashboard';
import SetCalendar from './components/SetCalendar';

import Set2 from './components/Set2';
import SetWeekPage from './pages/SetWeekPage';
import ViewEventPage from './pages/ViewEventPage';
import ViewEventsPage from './pages/ViewEventsPage';
import TypicalWeekPage from './pages/TypicalWeekPage';
import InviteUserPage from './pages/InviteUserPage';
import VerifyEmailPage from './pages/VerifyEmailPage';

import TrialPage from './pages/TrialPage';

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

      <Route path = '/calendar' exact>
        <SetCalendar />
      </Route>
       
      <Route path = '/grad' exact>
        <Set2 />
      </Route>

      <Route path = '/dashboard/setWeek' exact>
        <SetWeekPage />
      </Route>

      {/*example of viewEvent*/}
      <Route path = '/dashboard/viewEvent' exact>
        <ViewEventPage />
      </Route>

      {/*real connected viewEvent*/}
      <Route path = '/dashboard/viewEvents' exact>
        <ViewEventsPage />
      </Route>

      <Route path = '/dashboard/viewWeek' exact>
        <TypicalWeekPage />
      </Route>
      <Route path = '/joinEvent'>
        <InviteUserPage />
      </Route>
      <Route path = '/verifyEmail'>
        <VerifyEmailPage />
      </Route>
      </Switch>
    </Router>
  );
}

export default App;
