import React from 'react';
import Header from './Header';
import Channels from './Channels';
import Messages from './Messages';
import ModalAdd from './ModalAdd';

const ChatPage = () => {
  return (
    <div className='container'>
      <Header />
      <Channels />
      <Messages />
      <ModalAdd />
    </div>
  );
};

export default ChatPage;
