import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const auth = useAuth();
  return (
    <header className='header'>
      header<button onClick={auth.signout}>exit</button>
    </header>
  );
};

export default Header;
