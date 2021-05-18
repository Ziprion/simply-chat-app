import React, { useEffect } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, switchChannel } from '../../../redux/reducer.js';
import { setFocus, getCurrentModal } from '../../../utilities';
import { io } from 'socket.io-client';

const ModalRemove = () => {
  const socket = io();
  const dispatch = useDispatch();
  const currentType = getCurrentModal();
  const currentChannelId = useSelector(
    (state) => state.channelsInfo.currentChannelId
  );
  const currentStatus = currentType === 'remove';
  const currentId = useSelector((state) => state.modalInfo.extra);

  useEffect(() => {
    setFocus('button[data-role="remove-channel"]');
  });

  const handleRemoveChannel = () => {
    const message = {
      id: currentId,
    };
    try {
      socket.emit('removeChannel', message, () => {
        dispatch(closeModal());
        if (currentChannelId === currentId) {
          dispatch(switchChannel(1));
        }
        setFocus('input[name="body"]');
      });
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  };

  const modalClasses = cn({
    modal: true,
    show: currentStatus,
  });
  return !currentStatus ? null : (
    <div className={modalClasses}>
      <h3>Remove чат</h3>

      <button
        data-role='remove-channel'
        type='button'
        onClick={handleRemoveChannel}
      >
        Remove
      </button>
      <button type='button'>Отменить</button>
    </div>
  );
};

export default ModalRemove;
