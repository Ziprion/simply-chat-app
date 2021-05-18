import React, { useEffect } from 'react';
import Header from './Header';
import Channels from './Channels';
import Messages from './Messages';
import Modals from './Modals';

const ChatPage = () => {
  return (
    <div className='container'>
      <Header />
      <Channels />
      <Messages />
      <Modals />
    </div>
  );
};

export default ChatPage;
