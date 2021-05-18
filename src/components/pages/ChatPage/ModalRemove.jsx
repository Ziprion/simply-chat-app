import React, { useEffect } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, switchChannel } from '../../../redux/reducer.js';
import { setFocus, getCurrentType } from '../../../utilities';
import { io } from 'socket.io-client';

const ModalRemove = () => {
  const socket = io();
  const dispatch = useDispatch();
  const currentType = getCurrentType();
  console.log(currentType);
  const currentChannelId = useSelector(
    (state) => state.channelsInfo.currentChannelId
  );
  const currentStatus = currentType === 'remove';
  const currentId = useSelector((state) => state.modalInfo.extra);

  useEffect(() => {
    setFocus('button[data-role="remove-channel"]');
  });
  const handleCloseModal = () => (e) => {
    if (e.target.id === 'modal-wrapper') {
      dispatch(closeModal());
      setFocus('input[name="body"]');
    }
  };
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

  const modalWrapperClasses = cn({
    'modal-wrapper': true,
    show: currentStatus,
  });

  const modalClasses = cn({
    modal: true,
    show: currentStatus,
  });
  return !currentStatus ? null : (
    <div
      id='modal-wrapper'
      className={modalWrapperClasses}
      onClick={handleCloseModal()}
    >
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
    </div>
  );
};

export default ModalRemove;
