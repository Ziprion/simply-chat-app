import React from 'react';
import ReactDOM from 'react-dom';
import { useAuth, ProvideAuth } from './components/hooks/useAuth';
import App from './components/App';
import AuthPage from './components/Auth';
import { Provider } from 'react-redux';
import store from './redux/store.js';

const Init = () => {
  const auth = useAuth();

  return auth.status ? (
    <Provider store={store}>
      <App />
    </Provider>
  ) : (
    <AuthPage />
  );
};

const runApp = () => {
  ReactDOM.render(
    <ProvideAuth>
      <Init />
    </ProvideAuth>,
    document.getElementById('root')
  );
};

export default runApp;
