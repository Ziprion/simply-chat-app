import React from 'react';
import ReactDOM from 'react-dom';
import { useAuth, ProvideAuth } from './components/hooks/useAuth';
import App from './components/App';
import AuthPage from './components/Auth';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { socket } from './socket.js';
import { useDispatch } from 'react-redux';
import {
  setInitialState,
  addMessage,
  addChannel,
  renameChannel,
  removeChannel,
} from './redux/reducer.js';
import axios from 'axios';

const Init = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  socket.on('connect', () => {
    console.log('connect!');
    socket
      .on('newMessage', (msg) => {
        dispatch(addMessage(msg));
      })
      .on('newChannel', (msg) => {
        dispatch(addChannel(msg));
      })
      .on('renameChannel', (msg) => {
        dispatch(renameChannel(msg));
      })
      .on('removeChannel', (msg) => {
        dispatch(removeChannel(msg));
      });
  });

  if (auth.status) {
    axios({
      method: 'get',
      url: '/api/v1/data',
      headers: { Authorization: `Bearer ${localStorage.token}` },
      timeout: 4000,
    }).then((response) => {
      dispatch(setInitialState(response.data));
    });

    return <App />;
  }
  return <AuthPage />;
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
