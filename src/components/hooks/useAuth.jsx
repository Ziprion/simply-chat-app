import React, { useState, useContext, createContext } from 'react';

const AuthContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const initAuth = localStorage.token ? true : false;
  const [status, changeStatus] = useState(initAuth);

  const signin = (cb) => {
    changeStatus(true);
    cb();
  };

  const signout = (cb) => {
    delete localStorage.token;
    delete localStorage.username;
    changeStatus(false);
    cb();
  };

  return {
    status,
    signin,
    signout,
  };
}
