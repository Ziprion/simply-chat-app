import React from 'react';
import Header from './Header';
import Channels from './Channels';
import Messages from './Messages';

const ChatPage = () => {
  return (
    <div className='container'>
      <Header />
      <Channels />
      <Messages />
    </div>
  );
};

export default ChatPage;
