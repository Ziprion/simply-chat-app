import React, { useEffect } from 'react';
import MessagesForm from './MessagesForm';
import { useSelector } from 'react-redux';

const Messages = () => {
  useEffect(() => {
    const messagesBox = document.querySelector('.messages-box');
    messagesBox.scrollTop = messagesBox.scrollHeight;
  });
  const currentChannelId = useSelector(
    (state) => state.channelsInfo.currentChannelId
  );
  const messages = useSelector((state) => state.messagesInfo.messages);

  return (
    <div className='messages'>
      <div className='messages-box'>
        {messages
          .filter((message) => message.message.channelId === currentChannelId)
          .map((message) => (
            <p key={message.id}>
              {message.message.username}: {message.message.body}
            </p>
          ))}
      </div>
      <MessagesForm />
    </div>
  );
};

export default Messages;
