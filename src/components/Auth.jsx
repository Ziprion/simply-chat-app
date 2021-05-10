import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import NoMatchPage from './pages/NoMatchPage';
import SingInPage from './pages/SingInPage';
import SingUpPage from './pages/SingUpPage';

const AuthPage = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/signin' />
        </Route>
        <Route exact path='/signin'>
          <SingInPage />
        </Route>
        <Route exact path='/signup'>
          <SingUpPage />
        </Route>
        <Route path='*'>
          <NoMatchPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default AuthPage;
