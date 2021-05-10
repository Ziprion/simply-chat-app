import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { switchChannel, openModal } from '../../../redux/reducer.js';
import cn from 'classnames';

const Channels = () => {
  const channels = useSelector((state) => state.channelsInfo.channels);
  const currentChannelId = useSelector(
    (state) => state.channelsInfo.currentChannelId
  );
  const dispatch = useDispatch();

  const handleSwitchChannel = (id) => () => {
    dispatch(switchChannel(id));
  };

  const handleOpenModal = (extra = null) => {
    dispatch(openModal({ isOpened: true, type: 'add', extra }));
  };

  return (
    <div className='channels'>
      <div className='channels-header'>
        <h2>Чаты</h2>
        <button onClick={() => handleOpenModal()}>+</button>
      </div>
      <ul className='channels-box'>
        {channels.map(({ id, name, removable }) => {
          const isCurrentChannel = id === currentChannelId;
          const channelsClass = cn({
            'channels-item': true,
            'current-channel': isCurrentChannel,
          });
          return (
            <li className={channelsClass} key={id}>
              <button onClick={handleSwitchChannel(id)}>
                <span className='channel-name'>{name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Channels;
