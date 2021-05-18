import React, { useEffect } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, switchChannel } from '../../../redux/reducer.js';
import {
  setFocus,
  getCurrentModal,
  getCurrentChannel,
  getExtraId,
} from '../../../utilities';
import { socket } from '../../../socket.js';

const ModalRemove = () => {
  const dispatch = useDispatch();
  const currentStatus = getCurrentModal() === 'remove';
  const extraId = getExtraId();
  const currentChannelId = getCurrentChannel();

  useEffect(() => {
    setFocus('button[data-role="remove-channel"]');
  });

  const handleRemoveChannel = () => {
    const message = {
      id: extraId,
    };
    try {
      socket.emit('removeChannel', message, () => {
        dispatch(closeModal());
        if (currentChannelId === extraId) {
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
