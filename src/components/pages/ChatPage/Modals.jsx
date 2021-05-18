import React, { useEffect } from 'react';
import Header from './Header';
import Channels from './Channels';
import Messages from './Messages';
import ModalAdd from './ModalAdd';
import ModalRename from './ModalRename';
import ModalRemove from './ModalRemove';
import { handleEscKey } from '../../../utilities.js';

const ChatPage = () => {
  useEffect(() => {
    handleEscKey();
  });
  return (
    <div className='container'>
      <ModalAdd />
      <ModalRename />
      <ModalRemove />
    </div>
  );
};

export default ChatPage;
