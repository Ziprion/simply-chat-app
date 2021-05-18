import React from 'react';
import ReactDOM from 'react-dom';
import { useAuth, ProvideAuth } from './components/hooks/useAuth';
import App from './components/App';
import AuthPage from './components/Auth';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import {
  setInitialState,
  addMessage,
  addChannel,
  renameChannel,
  removeChannel,
} from './redux/reducer.js';
import axios from 'axios';
const socket = io();

const Init = () => {
  const auth = useAuth();

  if (!auth.status) {
    return <AuthPage />;
  }

  const dispatch = useDispatch();

  axios({
    method: 'get',
    url: '/api/v1/data',
    headers: { Authorization: `Bearer ${localStorage.token}` },
    timeout: 4000,
  }).then((response) => {
    dispatch(setInitialState(response.data));
  });

  socket.on('connect', () => {
    socket.on('newMessage', (msg) => {
      dispatch(addMessage(msg));
    });

    socket.on('newChannel', (msg) => {
      dispatch(addChannel(msg));
    });

    socket.on('renameChannel', (msg) => {
      dispatch(renameChannel(msg));
    });

    socket.on('removeChannel', (msg) => {
      dispatch(removeChannel(msg));
    });
  });

  return <App />;
};

const runApp = () => {
  ReactDOM.render(
    <ProvideAuth>
      <Provider store={store}>
        <Init />
      </Provider>
    </ProvideAuth>,
    document.getElementById('root')
  );
};

export default runApp;
