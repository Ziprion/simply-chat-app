import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import ChatPage from './pages/ChatPage/ChatPage';
import NoMatchPage from './pages/NoMatchPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <ChatPage />
        </Route>
        <Route exact path='/signin'>
          <Redirect to='/' />
        </Route>
        <Route exact path='/signup'>
          <Redirect to='/' />
        </Route>
        <Route path='*'>
          <NoMatchPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
