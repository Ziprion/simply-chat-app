import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setInitialState } from '../redux/reducer.js';
import ChatPage from './pages/ChatPage/ChatPage';
import NoMatchPage from './pages/NoMatchPage';

// const getInitData = async () => {
//   const response = await axios({
//     method: 'get',
//     url: '/api/v1/data',
//     headers: { Authorization: `Bearer ${localStorage.token}` },
//     timeout: 4000,
//   });
//   const data = response.data;
//   // console.log(data.channels);
//   // const dispatch = useDispatch();
//   // dispatch(initChannels(data.channels));
// };

const App = () => {
  const dispatch = useDispatch();
  axios({
    method: 'get',
    url: '/api/v1/data',
    headers: { Authorization: `Bearer ${localStorage.token}` },
    timeout: 4000,
  }).then((response) => {
    console.log(response.data);
    dispatch(setInitialState(response.data));
  });

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
